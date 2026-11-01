/// <reference types="@cloudflare/workers-types" />

/**
 * GET /rss.xml — 발행된 블로그 글의 RSS 2.0 피드. 네이버 서치어드바이저
 * (요청 → RSS 제출)와 구글 등에서 새 글을 빠르게 발견하도록 쓴다.
 * sitemap.xml과 같은 이유로(글이 Neon에 실시간으로 쌓임) Function으로 생성.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { blogPosts } from '../lib/db/schema';

interface Env {
    DATABASE_URL: string;
}

const SITE_URL = 'https://taxplanmj.com';

function escapeXml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
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
            .orderBy(desc(blogPosts.publishedAt))
            .limit(50);
    } catch {
        posts = [];
    }

    const items = posts
        .map((post) => {
            const link = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}/`;
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <enclosure url="${escapeXml(post.imageUrl)}" type="image/${post.imageUrl.endsWith('.webp') ? 'webp' : post.imageUrl.endsWith('.jpg') ? 'jpeg' : 'png'}" length="0" />
    </item>`;
        })
        .join('\n');

    const lastBuild = posts[0] ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>문정세무회계컨설팅 블로그</title>
    <link>${SITE_URL}/blog/</link>
    <description>이커머스 셀러를 위한 세무·회계 이야기 — 문정세무회계컨설팅</description>
    <language>ko</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
};
