import { marked } from 'marked';

const SITE_NAME = '문정세무회계컨설팅';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com';

/** marked가 만든 <img> 태그에 지연 로딩·비동기 디코딩 속성을 붙인다. */
export function lazyLoadImages(html: string): string {
    return html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

/** <table>을 가로 스크롤 래퍼로 감싼다 (모바일에서 글자 축소 대신 스크롤). */
export function wrapTables(html: string): string {
    return html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, '</table></div>');
}

/** <img> 바로 다음 줄의 <p><em>캡션</em></p>을 figure/figcaption으로 변환한다. */
export function wrapImageCaptions(html: string): string {
    return html.replace(
        /(<img[^>]*>)\s*<p><em>([^<]+)<\/em><\/p>/g,
        (_match, img: string, caption: string) => `<figure>${img}<figcaption>${caption}</figcaption></figure>`
    );
}

const CALLOUT_TYPES: Record<string, string> = {
    핵심: 'key',
    핵심요약: 'key',
    핵심결론: 'key',
    주의: 'warning',
    주의사항: 'warning',
    계산: 'calculation',
    계산예시: 'calculation',
    계산사례: 'calculation',
    '계산 사례': 'calculation',
    체크리스트: 'checklist',
    공식근거: 'source',
};

/**
 * 마크다운 인용문(`> [핵심] ...`, `> [체크리스트]\n> - 항목`)을 카드형
 * 콜아웃으로 바꾼다. 대괄호 라벨이 없는 일반 인용문은 기본 인용 스타일만
 * 적용된다(공식자료 짧은 인용 등, blockquote CSS).
 */
export function renderCallouts(html: string): string {
    return html.replace(
        /<blockquote>\s*<p>(?:<strong>)?\[([^\]]+)\](?:<\/strong>)?\s*(<\/p>)?/g,
        (_match, rawLabel: string, closingP: string | undefined) => {
            const label = rawLabel.trim();
            const type = CALLOUT_TYPES[label] || 'key';
            const opening = `<blockquote class="callout callout-${type}"><p class="callout-label">${escapeHtml(label)}</p>`;
            // 라벨 뒤에 바로 </p>가 오면(체크리스트처럼 라벨만 있는 줄) 빈 <p>를 새로 열지 않는다.
            return closingP ? opening : `${opening}<p>`;
        }
    );
}

/**
 * 블로그 본문 마크다운 → 최종 HTML 렌더링 파이프라인. 실제 글 페이지
 * (functions/blog/[slug].ts)와 검토 페이지의 "본문 보기" 미리보기
 * (functions/blog/review.ts)가 반드시 이 함수 하나만 공유해서, 두 화면의
 * 본문 스타일이 절대 어긋나지 않도록 한다.
 */
export async function renderPostBody(markdown: string): Promise<string> {
    const html = await marked.parse(markdown);
    return wrapImageCaptions(wrapTables(renderCallouts(lazyLoadImages(html))));
}

export function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const baseStyles = `
:root{--primary:#1B2A4A;--accent:#FF6B35;--text:#1F2937;--text-muted:#6B7280;--border:#E5E7EB;}
*{box-sizing:border-box;}
body{margin:0;font-family:'Noto Sans KR',system-ui,sans-serif;color:var(--text);background:#fff;word-break:keep-all;overflow-wrap:break-word;}
a{color:inherit;text-decoration:none;}
.container{max-width:1280px;margin:0 auto;padding:0 20px;}
@media(min-width:640px){.container{padding:0 1.5rem;}}
@media(min-width:1024px){.container{padding:0 2rem;}}

/* Header */
.site-header{background:rgba(255,255,255,.95);border-bottom:1px solid #f3f4f6;position:sticky;top:0;z-index:50;}
.site-header .row{display:flex;align-items:center;justify-content:space-between;height:64px;}
.brand{display:flex;align-items:center;gap:.6rem;font-weight:700;font-size:15px;color:var(--primary);}
.brand img{height:32px;width:auto;}
.nav-links{display:none;gap:.25rem;font-size:14px;font-weight:500;}
.nav-links a{padding:.5rem 1rem;border-radius:.5rem;color:#374151;}
.nav-links a:hover{background:#f9fafb;color:var(--primary);}
@media(min-width:1024px){.nav-links{display:flex;}}
.cta-btn{display:inline-flex;align-items:center;justify-content:center;background:var(--accent);color:#fff;font-weight:600;font-size:14px;padding:.6rem 1.25rem;border-radius:.6rem;white-space:nowrap;}

/* Footer */
.site-footer{background:var(--primary);color:#fff;margin-top:4rem;}
.site-footer .inner{padding:4rem 0;display:grid;gap:2.5rem;grid-template-columns:1fr;}
@media(min-width:768px){.site-footer .inner{grid-template-columns:1fr 1fr;}}
@media(min-width:1024px){.site-footer .inner{grid-template-columns:2fr 1fr 1fr;}}
.site-footer h4{font-weight:600;margin:0 0 1rem;color:rgba(255,255,255,.9);}
.site-footer p{color:rgba(255,255,255,.6);font-size:14px;line-height:1.7;}
.site-footer .quick-links a{display:block;padding:.4rem 0;font-size:14px;color:rgba(255,255,255,.5);}
.site-footer .quick-links a:hover{color:var(--accent);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);}
.footer-bottom .row{padding:1.5rem 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;}
.footer-bottom a{font-size:12px;color:rgba(255,255,255,.3);}
.footer-bottom a:hover{color:rgba(255,255,255,.6);}

/* Blog list */
.page-title{font-size:2rem;font-weight:800;color:var(--primary);letter-spacing:-.02em;margin:2.5rem 0 .5rem;}
@media(min-width:640px){.page-title{font-size:2.5rem;}}
.page-sub{color:var(--text-muted);margin-bottom:3rem;}
.post-grid{display:grid;gap:1.5rem;grid-template-columns:1fr;}
@media(min-width:640px){.post-grid{grid-template-columns:1fr 1fr;}}
.post-card{display:block;border-radius:1.5rem;overflow:hidden;border:1px solid #f3f4f6;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);transition:box-shadow .3s,transform .3s;}
.post-card:hover{box-shadow:0 10px 25px -3px rgba(0,0,0,.1);transform:translateY(-4px);}
.post-card .thumb{aspect-ratio:16/10;background:#f4f6f8;overflow:hidden;}
.post-card .thumb img{width:100%;height:100%;object-fit:cover;display:block;}
.post-card .body{padding:1.25rem;}
.post-card h2{font-size:1.125rem;font-weight:700;color:#111827;margin:0 0 .5rem;line-height:1.4;}
.post-card p{font-size:14px;color:var(--text-muted);line-height:1.6;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.empty{color:#9ca3af;font-size:14px;}

/* Blog detail — 레이아웃(페이지별로 다를 수 있는 것) */
.post-article{max-width:740px;margin:0 auto;padding:1.5rem 0 4rem;}
.back-link{font-size:14px;color:#9ca3af;}
.back-link:hover{color:var(--accent);}
.post-title{font-size:1.875rem;font-weight:800;color:var(--primary);margin:1rem 0 1.5rem;line-height:1.3;letter-spacing:-.02em;}
@media(min-width:640px){.post-title{font-size:2.25rem;}}
.post-hero{aspect-ratio:16/10;border-radius:1.5rem;overflow:hidden;background:#f4f6f8;margin-bottom:2rem;}
.post-hero img{width:100%;height:100%;object-fit:cover;display:block;}
.cta-block{margin-top:3.5rem;border-radius:1.5rem;background:linear-gradient(135deg,#1B2A4A 0%,#1e3a5f 50%,#1B2A4A 100%);padding:2.5rem 2rem;text-align:center;}
.cta-block p.title{color:#fff;font-weight:700;font-size:1.25rem;margin:0 0 .5rem;}
.cta-block p.desc{color:rgba(255,255,255,.6);font-size:14px;margin:0 0 1.5rem;}
.not-found{max-width:32rem;margin:6rem auto;text-align:center;color:var(--text-muted);}

/* Post body typography — 실제 글 페이지와 검토 페이지 "본문 보기"가
   renderPostBody() 하나만 공유하므로, 이 규칙도 두 화면에 동일하게 적용됨.
   레이아웃 규칙(review-card 등)과 절대 섞이지 않도록 이 블록만 손보면 됨. */
.post-body{font-size:17px;line-height:1.8;color:#374151;}
@media(min-width:640px){.post-body{font-size:18px;}}
.post-body p{margin:0 0 24px;}
.post-body h1,.post-body h2{font-size:25px;font-weight:800;line-height:1.4;color:var(--primary);margin:56px 0 20px;padding-left:14px;border-left:4px solid var(--accent);}
@media(min-width:640px){.post-body h1,.post-body h2{font-size:29px;}}
.post-body h3{font-size:20px;font-weight:700;line-height:1.4;color:#2D4A7A;margin:36px 0 14px;}
@media(min-width:640px){.post-body h3{font-size:22px;}}
.post-body a{color:var(--accent);text-decoration:underline;}
.post-body ul,.post-body ol{margin:0 0 24px;padding-left:1.4rem;}
.post-body li{margin-bottom:.5rem;}
.post-body strong{color:#111827;}

/* 이미지 */
.post-body img{width:100%;height:auto;display:block;margin:28px auto;border-radius:15px;}
.post-body figure{margin:28px 0;}
.post-body figure img{margin:0 0 8px;}
.post-body figcaption{font-size:13px;color:var(--text-muted);text-align:center;}

/* 인용/콜아웃 카드 — 라벨(핵심/주의/계산/체크리스트/공식근거) 없는 일반
   인용문은 기본 스타일만 적용된다(공식자료 짧은 인용 등). */
.post-body blockquote{margin:24px 0;padding:18px;border-left:4px solid var(--accent);background:#f9fafb;border-radius:12px;font-size:1em;}
@media(min-width:640px){.post-body blockquote{padding:22px;}}
.post-body blockquote p{margin:0;}
.post-body blockquote p + p{margin-top:.5rem;}
.post-body blockquote ul,.post-body blockquote ol{margin:0;padding-left:1.2rem;}
.post-body blockquote li{margin-bottom:.35rem;}
.post-body .callout-label{font-weight:700;margin:0 0 8px;font-size:13px;letter-spacing:.02em;text-transform:uppercase;}
.post-body .callout-key{background:#EFF6FF;border-left-color:#1B2A4A;}
.post-body .callout-key .callout-label{color:#1B2A4A;}
.post-body .callout-warning{background:#FFF7ED;border-left-color:#FF6B35;}
.post-body .callout-warning .callout-label{color:#FF6B35;}
.post-body .callout-calculation{background:#F8FAFC;border-left-color:#64748B;}
.post-body .callout-calculation .callout-label{color:#64748B;}
.post-body .callout-checklist{background:#F0FDF4;border-left-color:#16A34A;}
.post-body .callout-checklist .callout-label{color:#16A34A;}
.post-body .callout-source{background:#F8FAFC;border-left-color:#475569;}
.post-body .callout-source .callout-label{color:#475569;}

/* 표 — 모바일은 축소 대신 가로 스크롤 */
.table-scroll{overflow-x:auto;margin:0 0 24px;-webkit-overflow-scrolling:touch;}
.post-body table{width:100%;min-width:480px;border-collapse:collapse;font-size:15px;margin:0;}
.post-body th{background:var(--primary);color:#fff;font-weight:600;padding:12px 14px;text-align:left;white-space:nowrap;}
.post-body td{padding:12px 14px;border-bottom:1px solid var(--border);}

/* Draft review */
.review-page{max-width:740px;margin:0 auto;}
.review-list{display:flex;flex-direction:column;gap:1.5rem;}
.review-card{border:1px solid #f3f4f6;border-radius:1.25rem;padding:1.25rem;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.review-card h2{font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 1rem;line-height:1.4;}
.review-card .thumb{width:100%;aspect-ratio:16/10;border-radius:.75rem;overflow:hidden;background:#f4f6f8;margin-bottom:1rem;}
.review-card .thumb img{width:100%;height:100%;object-fit:cover;display:block;}
.review-card .excerpt{font-size:14px;color:var(--text-muted);margin:0 0 1rem;}
.review-card details{margin-bottom:1rem;font-size:14px;}
.review-card summary{cursor:pointer;color:var(--accent);font-weight:600;}
.review-card details .post-body{margin-top:1rem;}
.review-card form{margin:0;}
.review-card .cta-btn{border:none;cursor:pointer;font-family:inherit;width:100%;}
`;

const navLinks = [
    { label: '서비스', href: '/#services' },
    { label: '성장 로드맵', href: '/#roadmap' },
    { label: '세무 꿀팁', href: '/#shorts' },
    { label: '전문가 소개', href: '/#team' },
    { label: '블로그', href: '/blog/' },
];

function renderHeader(): string {
    const links = navLinks
        .map((l) => `<a href="${l.href}">${l.label}</a>`)
        .join('');
    return `
<header class="site-header">
  <div class="container row">
    <a href="/" class="brand">
      <img src="/moonjung_logo.png" alt="문정 로고" />
      <span>${SITE_NAME}</span>
    </a>
    <nav class="nav-links">${links}</nav>
    <a href="/consultation/" class="cta-btn">무료 상담신청</a>
  </div>
</header>`;
}

function renderFooter(): string {
    return `
<footer class="site-footer">
  <div class="container inner">
    <div>
      <div class="brand" style="margin-bottom:1.25rem;color:#fff;font-size:1.25rem;">
        <img src="/moonjung_logo.png" alt="문정 로고" style="filter:brightness(0) invert(1);opacity:.9;" />
        <span>${SITE_NAME}</span>
      </div>
      <p>이커머스 셀러의 성장을 함께하는 세무·회계·컨설팅 전문 파트너.<br />세무신고부터 정책자금, 법인전환까지 원스톱으로 지원합니다.</p>
      <p style="margin-top:1rem;">서울 송파구 법원로11길 11<br />문정현대지식산업센터 1차 A동 609~611호</p>
      <p style="margin-top:.5rem;">02-402-2353 · taxplanmj@gmail.com</p>
    </div>
    <div>
      <h4>바로가기</h4>
      <nav class="quick-links">
        <a href="/#services">서비스 소개</a>
        <a href="/#roadmap">성장 로드맵</a>
        <a href="/#shorts">세무 꿀팁 영상</a>
        <a href="/#team">전문가 소개</a>
        <a href="/consultation/">무료 상담신청</a>
      </nav>
    </div>
    <div>
      <h4>빠른 연결</h4>
      <nav class="quick-links">
        <a href="${KAKAO_CHANNEL_URL}" target="_blank" rel="noopener noreferrer">카카오톡 상담</a>
        <a href="tel:02-402-2353">전화 상담 (09:00~18:00)</a>
      </nav>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container row">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,.3);">&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem;">
        <a href="/privacy/">개인정보처리방침</a>
        <a href="/terms/">이용약관</a>
      </div>
    </div>
  </div>
</footer>`;
}

interface PageOptions {
    title: string;
    description: string;
    ogImage?: string;
    canonicalPath: string;
    bodyHtml: string;
    jsonLd?: Record<string, unknown>;
}

export function renderPage({ title, description, ogImage, canonicalPath, bodyHtml, jsonLd }: PageOptions): string {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `https://moonjung.pages.dev${canonicalPath}`;
    return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonicalUrl}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(fullTitle)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${canonicalUrl}" />
${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}" />` : ''}
<link rel="icon" href="/icon-192.png" type="image/png" />
<link rel="manifest" href="/manifest.json" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>${baseStyles}</style>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
${renderHeader()}
<main class="container">${bodyHtml}</main>
${renderFooter()}
</body>
</html>`;
}
