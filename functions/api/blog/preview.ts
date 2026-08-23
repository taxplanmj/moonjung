/// <reference types="@cloudflare/workers-types" />

/**
 * POST /api/blog/preview — /blog/edit/[slug]/ 페이지가 타이핑할 때마다 호출.
 * body: { contentMarkdown: string, key: string }
 * 응답: { html: string } — renderPostBody()로 만든, 실제 글 페이지와 완전히
 * 동일한 렌더링 결과. 별도 클라이언트 마크다운 라이브러리를 쓰지 않고 서버의
 * 진짜 렌더링 파이프라인을 그대로 재사용해서 미리보기가 항상 정확하다.
 */

import { renderPostBody } from '../../_lib/blog-html';

interface Env {
    BLOG_API_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    let body: { contentMarkdown?: string; key?: string };
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: '잘못된 요청 형식' }), { status: 400 });
    }

    if (body.key !== env.BLOG_API_SECRET) {
        return new Response(JSON.stringify({ error: '인증 실패' }), { status: 401 });
    }

    const html = await renderPostBody(body.contentMarkdown || '');

    return new Response(JSON.stringify({ html }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
