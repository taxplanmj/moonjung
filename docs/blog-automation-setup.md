# 자사 블로그 자동 발행 — 설정 가이드

챗지피티(ChatGPT Work) 예약 작업(Scheduled Tasks) + Skill로 2~3일마다 자동으로
블로그 초안을 쓰고, 대표님이 원터치로 승인하면 사이트에 게시되는 기능의 설정
방법입니다.

> **왜 Custom GPT Action이 아니라 Skill인가**: 처음엔 Custom GPT + Action으로
> 설계했지만, 2026년 기준 챗지피티 Scheduled Tasks는 **Custom GPT를 아예
> 지원하지 않습니다** ("Custom GPTs are not supported with tasks"). 예약
> 작업에서 쓸 수 있는 건 Skill이라, 이 문서는 Skill 기반으로 다시 작성했습니다.

## 이미 구축된 것

- `functions/api/blog/publish.ts` — 발행 API. 글을 받으면 이미지를 R2에 저장하고
  **draft(초안) 상태로** Neon에 저장합니다. 이 시점엔 아직 공개 안 됨.
- `functions/blog/review.ts` — 비공개 초안 검토 페이지. `/blog/review/?key=<BLOG_API_SECRET>`
  로 접속하면 draft 목록이 보이고, 글마다 "본문 보기"로 전체 내용을 확인할 수
  있습니다. 관리자 로그인 없이 URL의 key 파라미터로만 접근을 제어합니다.
- `functions/api/blog/approve.ts` — 검토 페이지의 "발행하기" 버튼이 호출하는
  엔드포인트. 누르는 즉시 해당 글이 published로 바뀌어 공개됩니다 (원터치 승인).
- `functions/blog/index.ts`, `functions/blog/[slug].ts` — 공개 블로그 목록/상세
  페이지. **Next.js 정적 페이지가 아니라 Cloudflare Pages Function**으로, 요청이
  올 때마다 Neon에서 published 글만 직접 읽어 그 자리에서 HTML을 렌더링합니다.
  승인하는 즉시 반영되고, 사이트 전체를 재배포할 필요가 없습니다. 글 끝에는
  항상 "무료 상담 신청하기" 버튼이 템플릿에서 고정으로 붙습니다.
- `functions/_lib/blog-html.ts` — 위 Function들이 공유하는 HTML 템플릿(헤더/푸터/
  스타일). 랜딩페이지의 `Header.tsx`/`Footer.tsx`와 별개의 순수 HTML이라, 그쪽
  네비게이션 메뉴가 바뀌면 이 파일도 같이 손봐야 합니다.
- `lib/db/schema.ts`의 `blog_posts` 테이블 (status: draft | published) — Neon에
  이미 생성 완료
- 시드 글 1편(`ecommerce-cashflow-first-post`, published 상태) — 챗지피티가 첫
  실제 글을 승인·발행하면 삭제 예정

## 대표님이 하셔야 하는 설정 (순서대로)

### 1. Cloudflare R2 버킷 공개 접근 설정
완료됨 (`moonjung` 버킷, public access 활성화, 공개 URL
`https://pub-a22ad36244bd43c09e7e6e92e244b0af.r2.dev`).

### 2. Cloudflare Pages 시크릿 등록
완료됨 — `BLOG_API_SECRET`, `DATABASE_URL`, `BLOG_IMAGES_PUBLIC_BASE_URL` 3개
모두 등록됨. `BLOG_API_SECRET` 값은 `.env.local`에서 확인 가능 (git에는 안
올라감).

### 3. 챗지피티에 Skill 만들기
챗지피티 Work(데스크탑 앱) → 아래 프롬프트를 그대로 붙여넣어 Skill을
만들어달라고 요청:

> 아래 조건으로 재사용 가능한 스킬을 하나 만들어줘. 이름은
> "moonjung-blog-publish" 정도로 해줘.
>
> **하는 일**: 문정세무회계컨설팅(이커머스 셀러 전문 세무회계 사무소) 블로그에
> 새 글의 초안을 자동으로 작성하고 등록한다.
>
> **글 작성 규칙**:
> - 대상 독자: 쿠팡/네이버/자사몰/해외직구/틱톡샵 이커머스 셀러
> - 주제: 매번 다르게 — 현금흐름/흑자도산, 반품·부진재고 비용, 절세 노하우,
>   정책자금, 플랫폼별 세무 이슈 중 선택
> - 톤: 친근하되 전문적으로, 정확한 세무 지식 기반
> - 금지: "업계 최고", "1위" 같은 근거 없는 최상급 표현 (한국 표시광고법 이슈)
> - 한글이 깨끗하게 들어간 썸네일 이미지 1장도 생성
>
> **등록 방법**: 아래 API를 호출한다. 이 글은 바로 공개되지 않고 초안으로
> 등록되며, 사람이 검토 후 승인해야 실제로 게시된다.
> - `POST https://moonjung.pages.dev/api/blog/publish`
> - 헤더: `Authorization: Bearer <내가 알려줄 키>`, `Content-Type: application/json`
> - 바디(JSON): `title`(string), `excerpt`(string, 1~2문장 요약),
>   `contentMarkdown`(string, 마크다운 본문), `imageUrl`(string, 생성한 이미지 URL)
> - 성공 시 200과 `{success, slug, status:"draft"}` 응답, 실패 시 401/400/502와
>   `{error}` 응답
>
> 실행할 때마다 결과(초안 등록 성공 여부, 어떤 제목으로 등록했는지, 실패했으면
> 이유)를 요약해서 알려줘.

### 4. 예약 작업(Scheduled Task) 설정
Skill이 만들어지면:
1. 챗지피티 사이드바 → **Scheduled** → 새 작업 만들기
2. 프롬프트에 `$moonjung-blog-publish`를 언급해서 이 스킬을 명시적으로 호출
3. 주기 설정 (이틀~사흘마다)
4. **예약 걸기 전에 일반 대화창에서 수동으로 한 번 먼저 실행**해서 정상 동작
   확인 (공식 권장 방식)

### 5. 초안 승인
새 초안이 등록되면 `https://moonjung.pages.dev/blog/review/?key=<BLOG_API_SECRET>`
에 접속 → 제목/요약/썸네일 확인 → "본문 보기"로 전체 내용 확인 → 문제없으면
**"발행하기"** 버튼 한 번 → 즉시 공개. 이 링크는 검토 대기 중인 글이 있을 때마다
직접 들어가서 확인하는 방식이라, 별도 알림(이메일 등)은 없습니다 — 필요해지면
나중에 추가 가능합니다.

## 확인 방법

1. Skill을 통해 초안 하나 등록
2. `/blog/review/?key=...`에서 뜨는지 확인
3. "발행하기" 눌러서 `/blog/`에 반영되는지 확인 (재배포 없이 즉시 반영)
