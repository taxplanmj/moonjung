/// <reference types="@cloudflare/workers-types" />

/**
 * 본문 중간에 들어갈 이미지를 R2에 영구 저장하는 엔드포인트.
 * publish.ts의 imageUrl(대표 이미지 1장)과 별개로, 본문에 2~4장 정도 삽입
 * 이미지를 쓰려면 각각 이 API로 먼저 올려서 영구 URL을 받은 다음, 그 URL을
 * contentMarkdown의 ![설명](영구URL) 형태로 넣고 publish를 호출해야 한다.
 * (챗지피티가 생성한 이미지의 임시 URL을 마크다운에 그대로 넣으면 며칠 안에
 * 링크가 만료돼서 이미지가 깨진다.)
 *
 * POST /api/blog/upload-image
 * Authorization: Bearer <BLOG_API_SECRET>
 * body: { imageUrl: string }   // 챗지피티가 생성한 이미지의 임시 URL
 * 응답: { url: string, width: number|null, height: number|null }
 *   width/height는 PNG·WebP만 파싱 가능 — 다른 포맷이거나 실패 시 null.
 *   width/height가 있으면 본문에는 마크다운 대신
 *   <img src="url" width="W" height="H" alt="설명" /> 형태로 직접 써서
 *   레이아웃 시프트를 막을 것. null이면 ![설명](url) 마크다운으로 대체.
 */

import { uploadImageFromUrl } from '../../_lib/r2-image';

interface Env {
    BLOG_API_SECRET: string;
    BLOG_IMAGES: R2Bucket;
    BLOG_IMAGES_PUBLIC_BASE_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const auth = request.headers.get('Authorization') || '';
    if (auth !== `Bearer ${env.BLOG_API_SECRET}`) {
        return new Response(JSON.stringify({ error: '인증 실패' }), { status: 401 });
    }

    let body: { imageUrl?: string };
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: '잘못된 요청 형식' }), { status: 400 });
    }

    if (!body.imageUrl) {
        return new Response(JSON.stringify({ error: 'imageUrl은 필수입니다' }), { status: 400 });
    }

    try {
        const image = await uploadImageFromUrl(env.BLOG_IMAGES, env.BLOG_IMAGES_PUBLIC_BASE_URL, body.imageUrl, 'blog/inline');
        return new Response(JSON.stringify(image), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: `이미지 저장 실패: ${err instanceof Error ? err.message : String(err)}` }),
            { status: 502 }
        );
    }
};
