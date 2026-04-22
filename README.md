# 문정세무회계컨설팅 공식 웹사이트

이커머스 셀러(쿠팡/네이버/자사몰/해외직구/틱톡샵) 전문 세무·회계·컨설팅 마케팅 사이트.

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router, Static Export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 + CSS Variables
- **UI**: shadcn/ui 호환 컴포넌트
- **Form**: react-hook-form + zod
- **Icons**: lucide-react
- **DB Schema**: Drizzle ORM (타입 정의만)
- **Deployment**: Cloudflare Pages

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 (정적 export)
npm run build

# 빌드 결과 확인
# out/ 폴더가 생성됩니다
```

## 📁 프로젝트 구조

```
app/
  layout.tsx              # 루트 레이아웃 (메타데이터, 폰트, Header/BottomNav)
  not-found.tsx           # 404 페이지
  (marketing)/page.tsx    # 메인 랜딩 페이지
  (consultation)/page.tsx # 상담 신청 페이지
components/
  ui/                     # shadcn/ui 호환 컴포넌트
  layout/                 # Header, BottomNav
  sections/               # Hero, PlatformTabs, CFORoadmap, ShortsGrid, TrustProof, Footer
  forms/                  # ConsultationForm (3단계 위저드)
lib/
  seo.ts                  # SEO 메타데이터/JSON-LD 헬퍼
  db/schema.ts            # Drizzle ORM 스키마 (타입만)
  utils.ts                # cn() 유틸리티
types/
  consultation.ts         # 상담 폼 인터페이스/Zod 스키마
public/
  manifest.json           # PWA 매니페스트
  sw.js                   # 서비스 워커 스텁
```

## ☁️ Cloudflare Pages 배포

```bash
# 빌드
npm run build

# Wrangler CLI로 배포
npx wrangler pages deploy out
```

## 🔮 확장 가이드

| 단계 | 내용 | 상태 |
|------|------|------|
| Phase 1 | 마케팅 사이트 + 상담 폼 | ✅ 완료 |
| Phase 2 | 고객 포털 + 인증 연동 | 🔜 예정 |
| Phase 3 | Toss 결제 모듈 추가 | 🔜 예정 |
| Phase 4 | PWA → React Native 앱 | 🔜 예정 |

## 환경 변수

`.env.example`을 `.env.local`로 복사 후 값을 설정하세요:

```env
NEXT_PUBLIC_LEAD_WEBHOOK=   # 상담 폼 제출 웹훅 URL
NEXT_PUBLIC_SITE_URL=       # 사이트 URL (SEO)
NEXT_PUBLIC_KAKAO_CHANNEL=  # 카카오 채널 링크
```
