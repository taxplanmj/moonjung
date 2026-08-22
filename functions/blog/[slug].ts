/// <reference types="@cloudflare/workers-types" />

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { marked } from 'marked';
import { blogPosts } from '../../lib/db/schema';
import { renderPage, escapeHtml } from '../_lib/blog-html';

interface Env {
    DATABASE_URL: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { env, params } = context;
    const slug = String(params.slug);

    let post: typeof blogPosts.$inferSelect | undefined;
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
        post = rows[0];
    } catch {
        post = undefined;
    }

    if (!post) {
        const html = renderPage({
            title: '글을 찾을 수 없습니다',
            description: '요청하신 글을 찾을 수 없습니다.',
            canonicalPath: `/blog/${slug}/`,
            bodyHtml: `
<div class="not-found">
  <p>요청하신 글을 찾을 수 없습니다.</p>
  <p style="margin-top:1rem;"><a href="/blog/" style="color:var(--accent);text-decoration:underline;">블로그 목록으로 돌아가기</a></p>
</div>`,
        });
        return new Response(html, {
            status: 404,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    const contentHtml = await marked.parse(post.contentMarkdown);

    const bodyHtml = `
<article class="post-article">
  <a href="/blog/" class="back-link">← 블로그 목록</a>
  <h1 class="post-title">${escapeHtml(post.title)}</h1>
  <div class="post-hero"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" /></div>
  <div class="post-body">${contentHtml}</div>
  <div class="cta-block">
    <p class="title">이런 고민, 있으신가요?</p>
    <p class="desc">이커머스 전문가가 사장님 상황에 맞는 절세 전략을 무료로 제안해 드립니다.</p>
    <a href="/consultation/" class="cta-btn">무료 상담 신청하기 →</a>
  </div>
</article>`;

    const html = renderPage({
        title: post.title,
        description: post.excerpt,
        ogImage: post.imageUrl,
        canonicalPath: `/blog/${slug}/`,
        bodyHtml,
    });

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
};
