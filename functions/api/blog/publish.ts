/// <reference types="@cloudflare/workers-types" />

/**
 * 챗지피티 커스텀 GPT 액션이 호출하는 블로그 자동 발행 엔드포인트.
 *
 * POST /api/blog/publish
 * Authorization: Bearer <BLOG_API_SECRET>
 * body: {
 *   title: string
 *   excerpt: string           // 카드 미리보기용 1~2문장 요약
 *   contentMarkdown: string   // 본문 (마크다운)
 *   imageUrl: string          // 챗지피티가 생성한 이미지의 임시 URL (여기서 fetch해서 R2에 재업로드)
 *   slug?: string             // 안 주면 title에서 자동 생성
 * }
 *
 * 하는 일: 이미지를 R2에 저장 → 글을 Neon에 draft 상태로 저장. 공개 /blog에는
 * 뜨지 않고, /blog/review/?key=<BLOG_API_SECRET>에서 검토 후 승인해야 published로
 * 바뀌어 노출된다 (functions/blog/review.ts, functions/api/blog/approve.ts).
 *
 * 필요한 환경변수/바인딩 (Cloudflare Pages 대시보드 또는 wrangler pages secret put):
 * - BLOG_API_SECRET   (이 엔드포인트 인증용 비밀키)
 * - DATABASE_URL       (Neon 연결 문자열)
 * - BLOG_IMAGES (R2 버킷 바인딩, wrangler.toml에 선언)
 * - BLOG_IMAGES_PUBLIC_BASE_URL (R2 버킷의 공개 접근 base URL, 예: https://pub-xxxx.r2.dev)
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { blogPosts } from '../../../lib/db/schema';

interface Env {
    BLOG_API_SECRET: string;
    DATABASE_URL: string;
    BLOG_IMAGES: R2Bucket;
    BLOG_IMAGES_PUBLIC_BASE_URL: string;
}

interface PublishBody {
    title: string;
    excerpt: string;
    contentMarkdown: string;
    imageUrl: string;
    slug?: string;
}

function slugify(title: string): string {
    const base = title
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);
    const suffix = Date.now().toString(36);
    return `${base}-${suffix}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const auth = request.headers.get('Authorization') || '';
    if (auth !== `Bearer ${env.BLOG_API_SECRET}`) {
        return new Response(JSON.stringify({ error: '인증 실패' }), { status: 401 });
    }

    let body: PublishBody;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: '잘못된 요청 형식' }), { status: 400 });
    }

    if (!body.title || !body.excerpt || !body.contentMarkdown || !body.imageUrl) {
        return new Response(
            JSON.stringify({ error: 'title, excerpt, contentMarkdown, imageUrl는 필수입니다' }),
            { status: 400 }
        );
    }

    const slug = body.slug?.trim() || slugify(body.title);

    // 1) 이미지 가져와서 R2에 저장 (챗지피티가 준 임시 URL은 곧 만료되므로 즉시 fetch)
    let imageUrl: string;
    try {
        const imageRes = await fetch(body.imageUrl);
        if (!imageRes.ok) throw new Error(`이미지 다운로드 실패: ${imageRes.status}`);
        const contentType = imageRes.headers.get('content-type') || 'image/png';
        const ext = contentType.includes('jpeg') ? 'jpg' : contentType.includes('webp') ? 'webp' : 'png';
        const key = `blog/${slug}.${ext}`;
        await env.BLOG_IMAGES.put(key, imageRes.body, {
            httpMetadata: { contentType },
        });
        imageUrl = `${env.BLOG_IMAGES_PUBLIC_BASE_URL}/${key}`;
    } catch (err) {
        return new Response(
            JSON.stringify({ error: `이미지 저장 실패: ${err instanceof Error ? err.message : String(err)}` }),
            { status: 502 }
        );
    }

    // 2) 글을 Neon에 저장
    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        await db.insert(blogPosts).values({
            slug,
            title: body.title,
            excerpt: body.excerpt,
            contentMarkdown: body.contentMarkdown,
            imageUrl,
            source: 'own-blog',
            status: 'draft',
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: `DB 저장 실패: ${err instanceof Error ? err.message : String(err)}` }),
            { status: 502 }
        );
    }

    return new Response(
        JSON.stringify({
            success: true,
            slug,
            status: 'draft',
            note: '초안으로 저장되었습니다. /blog/review/ 에서 검토 후 승인해야 사이트에 노출됩니다.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};
