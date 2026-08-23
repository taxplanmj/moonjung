/// <reference types="@cloudflare/workers-types" />

/**
 * GET /sitemap.xml — 정적 페이지 + Neon의 published 블로그 글을 합쳐서
 * 매 요청마다 생성. 블로그 글이 Next 빌드 시점이 아니라 Neon에 실시간으로
 * 있는 구조라 정적 sitemap으로는 커버가 안 되어 Function으로 만듦.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../lib/db/schema';

interface Env {
    DATABASE_URL: string;
}

const SITE_URL = 'https://moonjung.pages.dev';

const staticPaths = ['/', '/consultation/', '/blog/', '/privacy/', '/terms/'];

function escapeXml(input: string): string {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { env } = context;

    let posts: { slug: string; publishedAt: Date }[] = [];
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        posts = await db
            .select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
            .from(blogPosts)
            .where(eq(blogPosts.status, 'published'));
    } catch {
        posts = [];
    }

    const staticEntries = staticPaths
        .map((path) => `  <url><loc>${escapeXml(SITE_URL + path)}</loc></url>`)
        .join('\n');

    const postEntries = posts
        .map(
            (post) =>
                `  <url><loc>${escapeXml(`${SITE_URL}/blog/${post.slug}/`)}</loc><lastmod>${new Date(post.publishedAt).toISOString().slice(0, 10)}</lastmod></url>`
        )
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
};
