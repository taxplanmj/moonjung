/// <reference types="@cloudflare/workers-types" />

/**
 * GET /api/blog/content-feed
 *
 * 랜딩페이지 콘텐츠 섹션(components/sections/ContentSection.tsx)의 블로그
 * 줄이 클라이언트에서 fetch하는 엔드포인트. 정적 사이트(output:'export')라
 * 빌드 시점에 이 데이터를 구울 수 없어서, /blog와 동일하게 Cloudflare Pages
 * Function으로 매 요청마다 최신 데이터를 만들어 준다 — 재배포 없이 항상
 * 최신 글이 반영된다.
 *
 * 네이버 블로그·티스토리는 아직 채널 정보가 없어서 빈 배열을 반환한다.
 * 나중에 URL을 알려주면 fetchNaverBlogPosts()/fetchTistoryPosts()의 RSS
 * 주소만 채우면 되고, 프론트엔드(ContentSection.tsx)는 손댈 필요 없다 —
 * 응답 형식(FeedItem)이 이미 플랫폼 구분을 포함하고 있기 때문.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { blogPosts } from '../../../lib/db/schema';

interface Env {
    DATABASE_URL: string;
}

interface FeedItem {
    id: string;
    title: string;
    excerpt: string;
    platform: 'naver-blog' | 'tistory' | 'own-blog';
    readTime: string;
    thumbnail: string;
    url: string;
}

function estimateReadTime(markdown: string): string {
    const minutes = Math.max(1, Math.round(markdown.length / 500));
    return `${minutes}분`;
}

// 네이버/티스토리가 아직 없어서 자사 블로그로 4자리를 채운다. 두 채널이
// 추가되면 이 limit을 다시 2로 낮추고 fetchNaverBlogPosts/fetchTistoryPosts를
// 채워서 "플랫폼당 최신 2개" 원래 계획대로 되돌리면 된다.
async function fetchOwnBlogPosts(env: Env): Promise<FeedItem[]> {
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        const rows = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.status, 'published'))
            .orderBy(desc(blogPosts.publishedAt))
            .limit(4);

        return rows.map((post) => ({
            id: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            platform: 'own-blog' as const,
            readTime: estimateReadTime(post.contentMarkdown),
            thumbnail: post.imageUrl,
            url: `/blog/${post.slug}/`,
        }));
    } catch {
        return [];
    }
}

// TODO: 네이버 블로그 채널을 알게 되면 RSS(https://rss.blog.naver.com/{블로그ID}.xml)를
// fetch해서 최신 2개를 FeedItem으로 변환. platform: 'naver-blog', url: 원문 링크.
async function fetchNaverBlogPosts(): Promise<FeedItem[]> {
    return [];
}

// TODO: 티스토리 블로그 채널을 알게 되면 RSS(https://{블로그ID}.tistory.com/rss)를
// fetch해서 최신 2개를 FeedItem으로 변환. platform: 'tistory', url: 원문 링크.
async function fetchTistoryPosts(): Promise<FeedItem[]> {
    return [];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { env } = context;

    const [own, naver, tistory] = await Promise.all([
        fetchOwnBlogPosts(env),
        fetchNaverBlogPosts(),
        fetchTistoryPosts(),
    ]);

    const items: FeedItem[] = [...own, ...naver, ...tistory];

    return new Response(JSON.stringify(items), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
};
