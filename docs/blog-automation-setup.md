# 자사 블로그 자동 발행 — 설정 가이드

챗지피티 예약 작업(Scheduled Tasks) + 커스텀 GPT 액션으로 2~3일마다 자동으로
블로그 글을 쓰고 사이트에 게시하는 기능의 설정 방법입니다.

## 이미 구축된 것

- `functions/api/blog/publish.ts` — 발행 API (인증, 이미지 R2 저장, 글 Neon 저장)
- `functions/blog/index.ts`, `functions/blog/[slug].ts` — 블로그 목록/상세 페이지.
  **Next.js 정적 페이지가 아니라 Cloudflare Pages Function**으로, 요청이 올 때마다
  Neon에서 직접 글을 읽어 그 자리에서 HTML을 렌더링합니다. 그래서 글을 저장하는
  즉시 반영되고, 사이트 전체를 재배포할 필요가 없습니다. 글 끝에는 항상
  "무료 상담 신청하기" 버튼이 템플릿에서 고정으로 붙습니다.
- `functions/_lib/blog-html.ts` — 위 두 Function이 공유하는 HTML 템플릿(헤더/푸터/
  스타일). 랜딩페이지의 `Header.tsx`/`Footer.tsx`와 별개의 순수 HTML이라, 그쪽
  네비게이션 메뉴가 바뀌면 이 파일도 같이 손봐야 합니다.
- `lib/db/schema.ts`의 `blog_posts` 테이블 — Neon에 이미 생성 완료
- 시드 글 1편(`ecommerce-cashflow-first-post`) — 챗지피티가 첫 실제 글을
  발행하면 삭제 예정

## 대표님이 하셔야 하는 설정 (순서대로)

### 1. Cloudflare R2 버킷 공개 접근 설정
`moonjung` 버킷은 이미 생성되어 있습니다. Cloudflare 대시보드 → Storage &
Databases → R2 → `moonjung` 버킷 → Settings에서 **"Public access"를
활성화**하고, 공개 URL(`https://pub-xxxxxxxx.r2.dev` 형태)을 복사해두세요 —
아래 3번에서 필요합니다.

### 2. 발행 API용 비밀키 생성
아무 문자열이나 정해서(예: 랜덤 32자 문자열) 기억해두세요. 이게 챗지피티와 우리
API만 아는 비밀번호 역할을 합니다.

### 3. Cloudflare Pages 환경변수/시크릿 등록
Pages 프로젝트 → Settings → Environment variables에서 아래 3개를 등록:

| 이름 | 값 |
|---|---|
| `BLOG_API_SECRET` | 2번에서 정한 비밀키 |
| `DATABASE_URL` | Neon 연결 문자열 (이미 갖고 계신 것) |
| `BLOG_IMAGES_PUBLIC_BASE_URL` | 1번에서 복사한 R2 공개 URL |

### 4. 챗지피티 커스텀 GPT + 액션 설정
1. 챗지피티에서 새 커스텀 GPT 생성
2. "Configure" → "Actions" → "Create new action"
3. 아래 스키마를 그대로 붙여넣기

```yaml
openapi: 3.1.0
info:
  title: 문정세무회계컨설팅 블로그 발행 API
  version: 1.0.0
servers:
  - url: https://moonjung.pages.dev
paths:
  /api/blog/publish:
    post:
      operationId: publishBlogPost
      summary: 세무·회계 블로그 글을 작성해서 사이트에 자동 발행합니다.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [title, excerpt, contentMarkdown, imageUrl]
              properties:
                title:
                  type: string
                  description: 글 제목
                excerpt:
                  type: string
                  description: 카드 미리보기용 1~2문장 요약
                contentMarkdown:
                  type: string
                  description: 마크다운 형식의 본문
                imageUrl:
                  type: string
                  description: 생성한 썸네일 이미지의 URL
      responses:
        '200':
          description: 발행 성공
```

4. Authentication → "API Key" → Auth Type: **Bearer**, 값은 2번에서 만든 비밀키
5. 저장 후, 이 커스텀 GPT 안에서 예약 작업(Schedule) 설정:
   - "3일마다 문정세무회계컨설팅 이커머스 셀러 대상 세무 블로그 글을 1편 작성하고,
     한글이 깨끗하게 들어간 썸네일 이미지도 하나 만든 다음, publishBlogPost
     액션으로 게시해줘. 주제는 현금흐름/흑자도산, 반품·부진재고 비용, 절세
     노하우, 정책자금, 플랫폼별(쿠팡·네이버·틱톡샵 등) 세무 이슈 중에서 매번
     다르게 골라줘." 같은 식으로 반복 지시문 작성

## 확인 방법

설정 끝나면 챗지피티한테 예약 실행 전에 한 번 "지금 바로 테스트로 글 하나
써서 publishBlogPost 호출해봐"라고 시켜서, `/blog/`에 실제로 새 글이 (재배포
없이) 바로 올라오는지 확인해보시면 됩니다.
