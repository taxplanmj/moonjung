/// <reference types="@cloudflare/workers-types" />

/**
 * POST /api/blog/delete — /blog/review/ 페이지의 "삭제 확정" 버튼이 호출.
 * form-urlencoded body: { slug, key }
 * key가 BLOG_API_SECRET과 일치하면 해당 글(초안이든 발행글이든)을 완전히
 * 삭제한다. R2에 올라간 이미지 파일 자체는 지우지 않는다(참조가 끊길 뿐이라
 * 안전 — 실수로 지운 글의 이미지가 그새 사라지는 걸 방지).
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../../../lib/db/schema';

interface Env {
    DATABASE_URL: string;
    BLOG_API_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const form = await request.formData();
    const key = String(form.get('key') || '');
    const slug = String(form.get('slug') || '');

    if (key !== env.BLOG_API_SECRET) {
        return new Response('인증 실패', { status: 401 });
    }

    if (!slug) {
        return new Response('slug 누락', { status: 400 });
    }

    try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        await db.delete(blogPosts).where(eq(blogPosts.slug, slug));
    } catch (err) {
        return new Response(`삭제 실패: ${err instanceof Error ? err.message : String(err)}`, { status: 502 });
    }

    return Response.redirect(`${new URL(request.url).origin}/blog/review/?key=${encodeURIComponent(key)}`, 303);
};
