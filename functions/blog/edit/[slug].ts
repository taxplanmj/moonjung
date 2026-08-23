/// <reference types="@cloudflare/workers-types" />

/**
 * GET /blog/edit/[slug]/?key=<BLOG_API_SECRET> — 초안/발행글 수정 폼.
 * 저장은 POST /api/blog/update로 간다. 상태(draft/published)는 이 화면에서
 * 안 건드림 — 검토 페이지의 발행/발행취소 버튼으로 따로 전환.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../../../lib/db/schema';
import { renderPage, escapeHtml } from '../../_lib/blog-html';

interface Env {
    DATABASE_URL: string;
    BLOG_API_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env, params } = context;
    const slug = decodeURIComponent(String(params.slug));
    const key = new URL(request.url).searchParams.get('key') || '';

    if (key !== env.BLOG_API_SECRET) {
        return new Response('인증 실패', { status: 401 });
    }

    const sql = neon(env.DATABASE_URL);
    const db = drizzle(sql);
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    const post = rows[0];

    if (!post) {
        return new Response('글을 찾을 수 없습니다', { status: 404 });
    }

    const bodyHtml = `
<div class="review-page">
  <a href="/blog/review/?key=${escapeHtml(key)}" class="back-link">← 검토 목록으로</a>
  <h1 class="page-title">글 수정</h1>
  <p class="page-sub">상태(발행/초안)는 여기서 안 바뀝니다 — 검토 목록에서 따로 전환하세요.</p>
  <form method="POST" action="/api/blog/update" class="edit-form">
    <input type="hidden" name="slug" value="${escapeHtml(post.slug)}" />
    <input type="hidden" name="key" value="${escapeHtml(key)}" />

    <label for="title">제목</label>
    <input type="text" id="title" name="title" value="${escapeHtml(post.title)}" required />

    <label for="excerpt">요약</label>
    <textarea id="excerpt" name="excerpt" rows="2" required>${escapeHtml(post.excerpt)}</textarea>

    <label for="imageUrl">대표 이미지 URL</label>
    <input type="text" id="imageUrl" name="imageUrl" value="${escapeHtml(post.imageUrl)}" required />
    <p class="field-hint">그대로 두면 재업로드 안 함. 새 임시 URL을 넣으면 저장 시 R2에 새로 업로드됩니다.</p>

    <label for="contentMarkdown">본문(마크다운)</label>
    <textarea id="contentMarkdown" name="contentMarkdown" rows="24" required>${escapeHtml(post.contentMarkdown)}</textarea>

    <button type="submit" class="cta-btn">저장</button>
  </form>
</div>`;

    const html = renderPage({
        title: `수정 - ${post.title}`,
        description: '글 수정 페이지',
        canonicalPath: `/blog/edit/${slug}/`,
        bodyHtml,
    });

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
};
