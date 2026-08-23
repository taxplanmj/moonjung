# 콘텐츠 섹션(영상+블로그) — 백엔드 확장 설계

> 이 문서는 랜딩페이지의 "콘텐츠" 섹션(`components/sections/ContentSection.tsx`)을
> 정적 더미 데이터에서 실제 자동 수집 데이터로 전환할 때 참고하는 설계 기록입니다.
> 프론트엔드는 이미 이 구조를 전제로 구현되어 있고, 백엔드만 연결하면 됩니다.

## 배경

기존 `TestimonialsSection`(가짜 후기)을 삭제하고, `ShortsGrid`를 영상+블로그
통합 `ContentSection`으로 대체했습니다. 이유:

- 후기 15개가 전부 가상의 회사명으로 지어낸 콘텐츠라 표시광고법 리스크가 있어 삭제
- 영상/블로그 콘텐츠는 계속 늘어나는 구조라, 세로로 쌓으면 모바일에서 페이지가
  무한정 길어짐 → 가로 스크롤(캐러셀) 방식으로 변경해 섹션 높이를 고정

## 목표 아키텍처

각 채널에서 업로드된 콘텐츠 중 **조회수 상위 항목을 자동으로 골라 노출**하는 것이
최종 목표입니다.

```
[각 플랫폼 API] → [Cloudflare Pages Functions, 주기적 동기화]
                        ↓
                 [Neon Postgres: 메타데이터 저장]
                        ↓ (읽기)
                 [ContentSection.tsx: 조회수 상위 N개 렌더링]

[인스타/틱톡 등 만료되는 썸네일 URL] → 동기화 시 이미지 다운로드 → [Cloudflare R2]
```

### 왜 이 조합인가 (무료 티어 유지 목적)

- Neon: 메타데이터는 텍스트 위주라 용량이 거의 안 늘어남 (연 1~2MB 수준)
- **업서트 필수**: 콘텐츠 1건당 DB 행 1개만 유지. 동기화할 때마다 새 행을
  추가하면 안 됨 (무한 증가 방지). 조회수가 바뀌면 기존 행을 업데이트.
- R2: 이미지 자체를 DB에 넣지 않고 오브젝트 스토리지에 저장. 무료 티어(10GB)로
  수천 개 콘텐츠도 충분히 커버됨.
- 오래된 콘텐츠도 굳이 주기적으로 삭제할 필요 없음 (저장량이 문제 되는 규모가
  아니고, 인스타/틱톡처럼 원본 URL이 만료되는 채널은 한 번 캐싱해둔 걸 지우면
  나중에 복구가 안 될 수 있음)

## 채널별 현황

### 영상 (5개 채널, `VideoPlatform` 타입)

| 플랫폼 | 자동 수집 가능 여부 | 비고 |
|---|---|---|
| 유튜브 (`youtube`) | ✅ 바로 가능 | YouTube Data API v3. 썸네일 URL 영구적이라 그대로 사용 가능 |
| 인스타그램 (`instagram`) | ⚠️ 가능하나 준비 필요 | Instagram Graph API. 비즈니스 계정 전환 + 페이스북 앱 연동 필요. 액세스 토큰 60일 주기 갱신 로직 필요. 썸네일 URL 만료되므로 R2 캐싱 필수 |
| 틱톡 (`tiktok`) | ⚠️ 가능하나 준비 필요 | TikTok Display API. 개발자 앱 등록 + 승인 심사 필요. 썸네일 URL 만료 가능성 있어 R2 캐싱 권장 |
| 카카오 (`kakao`) | ❓ 조사 필요 | 카카오톡 채널 콘텐츠의 조회수를 외부에서 가져올 공식 API 존재 여부 미확인 |
| 네이버 (`naver`) | ❓ 조사 필요 | 네이버TV 등에서 조회수를 가져올 공식 API 존재 여부 미확인 |

**우선순위**: 유튜브부터 먼저 연결하고, 인스타/틱톡은 계정·앱 승인 준비되는 대로
추가. 카카오/네이버는 추가 조사 후 가능 여부 확정.

### 블로그 (3개 채널, `BlogPlatform` 타입)

| 플랫폼 | 방식 |
|---|---|
| 네이버 블로그 (`naver-blog`) | 핵심 채널 (한국 검색 점유율 때문에 필수). RSS로 최신글 수집 예정, 아직 미착수 |
| 티스토리 (`tistory`) | 구글 검색 노출 보완용. **Open API는 2023~2024년에 완전 종료됨** — RSS로만 수집 가능. 아직 미착수 |
| 자사 블로그 (`own-blog`) | ✅ **구현 완료.** 아래 "자사 블로그 자동 발행 (구현 완료)" 참고 |

네이버/티스토리 둘 다 조회수를 외부에 공개하는 공식 API가 없다는 것을 확인함
(RSS는 글 목록/본문만 제공). 그래서 콘텐츠 섹션의 블로그 줄은 유튜브 영상 줄과
달리 조회수 정렬이 아니라 **최신순 정렬**로 확정 (네이버 최신 2개 + 티스토리
최신 2개 + 자사 블로그 최신 글, 클릭 시 각 원문/자사 글로 이동).

## 자사 블로그 자동 발행 (구현 완료)

챗지피티 Work의 예약 작업(Scheduled Tasks) + Skill로 2~3일마다 AI가 직접 초안을
쓰고 이미지를 만들어 등록하면, 대표님이 `/blog/review/`에서 원터치로 승인해야
실제 공개되는 구조입니다. 관리자 로그인 UI는 없고, API 비밀키 하나로 발행 API
인증과 검토 페이지 접근 제어를 겸합니다.

> 처음엔 "사람 검수 없이 완전 자동 공개"로 설계했었는데, 두 가지 이유로 초안
> +원터치 승인 구조로 바뀌었습니다: (1) 챗지피티 Scheduled Tasks는 Custom GPT를
> 지원하지 않아 Custom GPT Action 설계 자체를 Skill 기반으로 다시 짜야 했고,
> (2) 그 과정에서 "완전 자동 공개면 승인은 어떻게 하냐"는 질문이 나오면서
> 최소 검수 단계(초안 → 원터치 승인)를 넣는 쪽으로 재결정.

```
[챗지피티 Scheduled Task] → [Skill] → POST /api/blog/publish
                                                  ↓
                              Cloudflare Pages Function (functions/api/blog/publish.ts)
                                                  ↓
                    이미지 fetch → R2 저장    글 메타데이터 → Neon 저장 (status: draft)
                                                  ↓
                              대표님이 /blog/review/?key=... 접속
                                                  ↓
                    "발행하기" 클릭 → POST /api/blog/approve → status: published
                                                  ↓
  방문자가 /blog/ 또는 /blog/[slug]/ 요청 → Cloudflare Pages Function
  (functions/blog/index.ts, functions/blog/[slug].ts)이 요청마다 Neon에서
  published 글만 직접 읽어 그 자리에서 HTML 렌더링 (재배포 불필요)
```

- 이미지를 깃허브 저장소에 커밋하는 방식은 채택하지 않음 (레포가 영구적으로
  비대해지는 문제 때문에 기각) → R2 오브젝트 스토리지로 대체
- 글 본문을 정적 마크다운 파일로 커밋하는 방식도 기각 (매 발행마다 커밋+재배포
  자동화가 더 복잡해짐) → Neon에 저장
- **처음엔 `/blog`를 Next.js `generateStaticParams()` 기반 정적 페이지로 만들고
  발행할 때마다 Cloudflare Pages Deploy Hook으로 전체 사이트를 재배포하는
  방식으로 구현했으나, 글 하나 때문에 사이트 전체를 재빌드하는 게 과하고
  반영도 몇 분씩 지연된다는 지적으로 폐기.** 대신 `/blog` 라우트 자체를
  Cloudflare Pages Function으로 옮겨 매 요청마다 Neon을 직접 읽게 바꿔서,
  재배포 없이 즉시 반영되도록 최종 확정. 이 "Function이 Neon을 직접 읽는" 패턴은
  향후 네이버/티스토리 RSS 수집 때도 그대로 재사용 가능 (오히려 그쪽처럼 자주
  갱신되는 콘텐츠일수록 재배포 기반 방식은 안 맞았을 것)
- 상세 설정 절차(R2 버킷, 시크릿 등록, 챗지피티 Skill 프롬프트, 승인 방법)는
  [`docs/blog-automation-setup.md`](./blog-automation-setup.md) 참고

구글 블로거(Blogger)는 국내 트래픽이 적어 채널 목록에서 제외. 스레드(Threads)는
블로그가 아니라 SNS 채널이라 이 목록과 별개로 관리.

## 현재 프론트엔드 구현 상태

- `lib/content-data.ts` — `VideoItem`/`BlogItem` 타입 정의. `videos`는 아직
  정적 더미 배열(유튜브 등 미연동). `blogPosts` 정적 배열은 **제거됨** —
  블로그는 실제 데이터로 전환 완료.
- `components/sections/ContentSection.tsx` — 영상 줄(정적 더미) + 블로그
  줄(실제 데이터, `/api/blog/content-feed`를 클라이언트에서 fetch), 각각
  가로 스크롤. 데스크탑 4개씩 보이는 폭으로 카드 크기 고정, 모바일은 카드가
  일부 걸치게 해서 "더 있음"을 자연스럽게 인지시킴
- `functions/api/blog/content-feed.ts` — 블로그 줄이 fetch하는 Function.
  자사 블로그는 Neon에서 최신 published 2개를 직접 읽고, `fetchNaverBlogPosts()`
  /`fetchTistoryPosts()`는 채널 정보가 없어 빈 배열을 반환하는 스텁으로
  미리 만들어둠 — RSS 주소만 알면 그 두 함수만 채우면 되고 프론트엔드는
  손댈 필요 없음

## 남은 작업 (백엔드)

1. ✅ ~~자사 블로그: 마크다운 기반 정적 페이지 시스템 구축~~ → 완료 (Neon+R2 기반)
2. ✅ ~~`lib/content-data.ts`의 블로그 정적 배열을 API fetch로 교체~~ → 완료
   (`functions/api/blog/content-feed.ts`)
3. 네이버/티스토리 RSS 채널 주소 확보되는 대로 `content-feed.ts`의
   `fetchNaverBlogPosts()`/`fetchTistoryPosts()` 구현 (최신 2개씩, 위 표 참고)
4. 유튜브 Data API 키 발급 → 동기화 Function 작성 (영상 줄)
5. Neon에 콘텐츠 메타데이터 테이블 생성 (업서트 방식, 영상용)
6. R2 버킷에 영상 썸네일 캐싱 로직 추가 (인스타/틱톡용, 자사 블로그 이미지용 버킷과는 별도 검토)
7. 인스타그램 비즈니스 계정 + 틱톡 개발자 앱 준비되는 대로 해당 채널 연동 추가
8. 카카오/네이버 영상 API 가능 여부 조사
