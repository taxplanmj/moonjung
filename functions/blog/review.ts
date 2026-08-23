/// <reference types="@cloudflare/workers-types" />

/**
 * 비공개 글 관리 페이지. GET /blog/review/?key=<BLOG_API_SECRET>
 * 초안(draft)과 발행글(published)을 모두 보여주고, 카드마다 수정/발행(또는
 * 발행취소)/삭제 액션이 붙는다. 발행취소·삭제는 되돌리기 어려운 동작이라
 * 카드 안에 "제목을 정확히 입력해야 버튼이 눌리는" 확인 단계를 둔다
 * (깃허브 저장소 삭제 시 이름을 다시 입력시키는 것과 같은 패턴).
 * 관리자 로그인 없이 같은 비밀키로만 접근 제어.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { blogPosts } from '../../lib/db/schema';
import { renderPage, escapeHtml, renderPostBody } from '../_lib/blog-html';

interface Env {
    DATABASE_URL: string;
    BLOG_API_SECRET: string;
}

function renderConfirmAction(opts: {
    action: string;
    label: string;
    confirmLabel: string;
    slug: string;
    key: string;
    title: string;
}): string {
    const { action, label, confirmLabel, slug, key, title } = opts;
    return `
      <details class="danger-details">
        <summary>${escapeHtml(label)}</summary>
        <p class="confirm-hint">확인을 위해 제목을 정확히 입력하세요.</p>
        <form method="POST" action="${action}" class="confirm-form">
          <input type="hidden" name="slug" value="${escapeHtml(slug)}" />
          <input type="hidden" name="key" value="${escapeHtml(key)}" />
          <input type="text" class="confirm-input" data-expected="${escapeHtml(title)}" placeholder="${escapeHtml(title)}" autocomplete="off" />
          <button type="submit" class="danger-btn" disabled>${escapeHtml(confirmLabel)}</button>
        </form>
      </details>`;
}

async function renderCard(post: typeof blogPosts.$inferSelect, key: string): Promise<string> {
    const contentHtml = await renderPostBody(post.contentMarkdown);
    const dimensions =
        post.imageWidth && post.imageHeight ? ` width="${post.imageWidth}" height="${post.imageHeight}"` : '';
    const editHref = `/blog/edit/${encodeURIComponent(post.slug)}/?key=${encodeURIComponent(key)}`;

    const primaryAction =
        post.status === 'draft'
            ? `
          <form method="POST" action="/api/blog/approve">
            <input type="hidden" name="slug" value="${escapeHtml(post.slug)}" />
            <input type="hidden" name="key" value="${escapeHtml(key)}" />
            <button type="submit" class="cta-btn">발행하기</button>
          </form>`
            : renderConfirmAction({
                  action: '/api/blog/unpublish',
                  label: '발행 취소',
                  confirmLabel: '발행 취소 확정',
                  slug: post.slug,
                  key,
                  title: post.title,
              });

    return `
        <div class="review-card">
          <span class="status-badge status-${post.status}">${post.status === 'draft' ? '초안' : '발행됨'}</span>
          <h2 class="post-title">${escapeHtml(post.title)}</h2>
          <div class="thumb"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" loading="lazy"${dimensions} /></div>
          <p class="excerpt">${escapeHtml(post.excerpt)}</p>
          <details>
            <summary>본문 보기</summary>
            <div class="post-body">${contentHtml}</div>
          </details>
          <div class="card-actions">
            <a href="${editHref}" class="cta-btn secondary-btn">수정</a>
            ${primaryAction}
          </div>
          ${renderConfirmAction({
              action: '/api/blog/delete',
              label: '삭제',
              confirmLabel: '삭제 확정',
              slug: post.slug,
              key,
              title: post.title,
          })}
        </div>`;
}

const confirmScript = `
document.querySelectorAll('.confirm-form').forEach(function (form) {
  var input = form.querySelector('.confirm-input');
  var btn = form.querySelector('button[type="submit"]');
  input.addEventListener('input', function () {
    btn.disabled = input.value !== input.dataset.expected;
  });
});
`;

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const key = new URL(request.url).searchParams.get('key') || '';

    if (key !== env.BLOG_API_SECRET) {
        return new Response('인증 실패', { status: 401 });
    }

    let posts: (typeof blogPosts.$inferSelect)[] = [];
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    } catch {
        posts = [];
    }

    const drafts = posts.filter((p) => p.status === 'draft');
    const published = posts.filter((p) => p.status === 'published');

    const draftsHtml =
        drafts.length === 0
            ? '<p class="empty">검토 대기 중인 초안이 없습니다.</p>'
            : (await Promise.all(drafts.map((p) => renderCard(p, key)))).join('');

    const publishedHtml =
        published.length === 0
            ? '<p class="empty">발행된 글이 없습니다.</p>'
            : (await Promise.all(published.map((p) => renderCard(p, key)))).join('');

    const bodyHtml = `
<div class="review-page">
  <h1 class="page-title">글 관리</h1>
  <p class="page-sub">발행하면 즉시 공개됩니다. 삭제·발행 취소는 제목을 정확히 입력해야 실행됩니다.</p>

  <h2 class="section-heading">검토 대기 중인 초안</h2>
  <div class="review-list">${draftsHtml}</div>

  <h2 class="section-heading">발행된 글</h2>
  <div class="review-list">${publishedHtml}</div>
</div>
<script>${confirmScript}</script>
`;

    const html = renderPage({
        title: '글 관리',
        description: '비공개 글 관리 페이지',
        canonicalPath: '/blog/review/',
        bodyHtml,
    });

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
};
