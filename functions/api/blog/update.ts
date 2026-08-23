/// <reference types="@cloudflare/workers-types" />

/**
 * POST /api/blog/update — /blog/edit/[slug]/ 페이지의 "저장" 버튼이 호출.
 * form-urlencoded body: { slug, key, title, excerpt, contentMarkdown, imageUrl }
 * imageUrl이 기존 저장값과 다르면(새 임시 URL을 넣은 경우) R2에 다시
 * 업로드해서 영구 URL로 치환한다. 같으면(그대로 둔 경우) 재업로드 생략.
 * status는 이 엔드포인트에서 건드리지 않는다(발행/발행취소는 별도 API).
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../../../lib/db/schema';
import { uploadImageFromUrl } from '../../_lib/r2-image';

interface Env {
    DATABASE_URL: string;
    BLOG_API_SECRET: string;
    BLOG_IMAGES: R2Bucket;
    BLOG_IMAGES_PUBLIC_BASE_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const form = await request.formData();
    const key = String(form.get('key') || '');
    const slug = String(form.get('slug') || '');
    const title = String(form.get('title') || '').trim();
    const excerpt = String(form.get('excerpt') || '').trim();
    const contentMarkdown = String(form.get('contentMarkdown') || '').trim();
    const imageUrl = String(form.get('imageUrl') || '').trim();

    if (key !== env.BLOG_API_SECRET) {
        return new Response('인증 실패', { status: 401 });
    }

    if (!slug || !title || !excerpt || !contentMarkdown || !imageUrl) {
        return new Response('필수 항목이 비어있습니다', { status: 400 });
    }

    const sql = neon(env.DATABASE_URL);
    const db = drizzle(sql);

    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    const existing = rows[0];
    if (!existing) {
        return new Response('글을 찾을 수 없습니다', { status: 404 });
    }

    let finalImageUrl = existing.imageUrl;
    let imageWidth = existing.imageWidth;
    let imageHeight = existing.imageHeight;

    if (imageUrl !== existing.imageUrl) {
        try {
            const image = await uploadImageFromUrl(env.BLOG_IMAGES, env.BLOG_IMAGES_PUBLIC_BASE_URL, imageUrl, 'blog/thumb');
            finalImageUrl = image.url;
            imageWidth = image.width;
            imageHeight = image.height;
        } catch (err) {
            return new Response(
                `이미지 저장 실패: ${err instanceof Error ? err.message : String(err)}`,
                { status: 502 }
            );
        }
    }

    try {
        await db
            .update(blogPosts)
            .set({ title, excerpt, contentMarkdown, imageUrl: finalImageUrl, imageWidth, imageHeight })
            .where(eq(blogPosts.slug, slug));
    } catch (err) {
        return new Response(`저장 실패: ${err instanceof Error ? err.message : String(err)}`, { status: 502 });
    }

    return Response.redirect(`${new URL(request.url).origin}/blog/review/?key=${encodeURIComponent(key)}`, 303);
};
