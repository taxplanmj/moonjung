/// <reference types="@cloudflare/workers-types" />

/**
 * 비공개 초안 검토 페이지. GET /blog/review/?key=<BLOG_API_SECRET>
 * 목록 페이지 자체는 draft만 보여주고, 카드마다 /api/blog/approve로 보내는
 * 폼(버튼 한 번)이 붙어있다. 관리자 로그인 없이 같은 비밀키로만 접근 제어.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { marked } from 'marked';
import { blogPosts } from '../../lib/db/schema';
import { renderPage, escapeHtml } from '../_lib/blog-html';

interface Env {
    DATABASE_URL: string;
    BLOG_API_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const key = new URL(request.url).searchParams.get('key') || '';

    if (key !== env.BLOG_API_SECRET) {
        return new Response('인증 실패', { status: 401 });
    }

    let drafts: (typeof blogPosts.$inferSelect)[] = [];
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        drafts = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.status, 'draft'))
            .orderBy(desc(blogPosts.createdAt));
    } catch {
        drafts = [];
    }

    const cardsHtml =
        drafts.length === 0
            ? '<p class="empty">검토 대기 중인 초안이 없습니다.</p>'
            : (
                  await Promise.all(
                      drafts.map(async (post) => {
                          const contentHtml = await marked.parse(post.contentMarkdown);
                          return `
        <div class="review-card">
          <div class="thumb"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" loading="lazy" /></div>
          <div class="body">
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.excerpt)}</p>
            <details>
              <summary>본문 보기</summary>
              <div class="post-body">${contentHtml}</div>
            </details>
            <form method="POST" action="/api/blog/approve">
              <input type="hidden" name="slug" value="${escapeHtml(post.slug)}" />
              <input type="hidden" name="key" value="${escapeHtml(key)}" />
              <button type="submit" class="cta-btn">발행하기</button>
            </form>
          </div>
        </div>`;
                      })
                  )
              ).join('');

    const bodyHtml = `
<div class="review-page">
  <h1 class="page-title">초안 검토</h1>
  <p class="page-sub">발행하면 즉시 공개됩니다.</p>
  <div class="review-list">${cardsHtml}</div>
</div>
`;

    const html = renderPage({
        title: '초안 검토',
        description: '비공개 초안 검토 페이지',
        canonicalPath: '/blog/review/',
        bodyHtml,
    });

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
};
