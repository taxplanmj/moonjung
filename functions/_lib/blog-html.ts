const SITE_NAME = '문정세무회계컨설팅';
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com';

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
.container{max-width:1280px;margin:0 auto;padding:0 1rem;}
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

/* Blog detail */
.post-article{max-width:42rem;margin:0 auto;padding:1.5rem 0 4rem;}
.back-link{font-size:14px;color:#9ca3af;}
.back-link:hover{color:var(--accent);}
.post-title{font-size:1.875rem;font-weight:800;color:var(--primary);margin:1rem 0 1.5rem;line-height:1.3;letter-spacing:-.02em;}
@media(min-width:640px){.post-title{font-size:2.25rem;}}
.post-hero{aspect-ratio:16/10;border-radius:1.5rem;overflow:hidden;background:#f4f6f8;margin-bottom:2rem;}
.post-hero img{width:100%;height:100%;object-fit:cover;display:block;}
.post-body{line-height:1.85;color:#374151;font-size:1rem;}
.post-body h1,.post-body h2,.post-body h3{color:var(--primary);font-weight:700;margin:2rem 0 1rem;}
.post-body p{margin:0 0 1.25rem;}
.post-body a{color:var(--accent);text-decoration:underline;}
.post-body ul,.post-body ol{margin:0 0 1.25rem;padding-left:1.5rem;}
.post-body strong{color:#111827;}
.cta-block{margin-top:3.5rem;border-radius:1.5rem;background:linear-gradient(135deg,#1B2A4A 0%,#1e3a5f 50%,#1B2A4A 100%);padding:2.5rem 2rem;text-align:center;}
.cta-block p.title{color:#fff;font-weight:700;font-size:1.25rem;margin:0 0 .5rem;}
.cta-block p.desc{color:rgba(255,255,255,.6);font-size:14px;margin:0 0 1.5rem;}

.not-found{max-width:32rem;margin:6rem auto;text-align:center;color:var(--text-muted);}
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
}

export function renderPage({ title, description, ogImage, canonicalPath, bodyHtml }: PageOptions): string {
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
</head>
<body>
${renderHeader()}
<main class="container">${bodyHtml}</main>
${renderFooter()}
</body>
</html>`;
}
