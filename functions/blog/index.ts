/// <reference types="@cloudflare/workers-types" />

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { blogPosts } from '../../lib/db/schema';
import { renderPage, escapeHtml } from '../_lib/blog-html';

interface Env {
    DATABASE_URL: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { env } = context;

    let posts: (typeof blogPosts.$inferSelect)[] = [];
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        posts = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.status, 'published'))
            .orderBy(desc(blogPosts.publishedAt));
    } catch {
        posts = [];
    }

    const cardsHtml =
        posts.length === 0
            ? '<p class="empty">아직 등록된 글이 없습니다.</p>'
            : `<div class="post-grid">${posts
                  .map(
                      (post) => `
        <a class="post-card" href="/blog/${encodeURIComponent(post.slug)}/">
          <div class="thumb"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" loading="lazy" /></div>
          <div class="body">
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.excerpt)}</p>
          </div>
        </a>`
                  )
                  .join('')}</div>`;

    const bodyHtml = `
<h1 class="page-title">블로그</h1>
<p class="page-sub">이커머스 셀러를 위한 세무·회계 이야기</p>
${cardsHtml}
`;

    const html = renderPage({
        title: '블로그',
        description: '이커머스 셀러를 위한 세무·회계 이야기',
        canonicalPath: '/blog/',
        bodyHtml,
    });

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
};
