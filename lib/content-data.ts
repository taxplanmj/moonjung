/**
 * 콘텐츠 섹션(영상+블로그)의 데이터 레이어.
 *
 * 영상(videos)은 아직 정적 더미 데이터입니다 — 유튜브 API 등 채널 연동이
 * 안 돼서. 블로그는 실제 데이터로 전환 완료: ContentSection.tsx가
 * /api/blog/content-feed(functions/api/blog/content-feed.ts)를 클라이언트에서
 * fetch해서 채우므로, 여기엔 더 이상 blogPosts 정적 배열이 없습니다 — 타입
 * (BlogItem/BlogPlatform)만 공유합니다.
 *
 * 전체 설계는 docs/content-aggregation-plan.md 참고.
 */

export type VideoPlatform = 'youtube' | 'tiktok' | 'instagram' | 'kakao' | 'naver';
export type BlogPlatform = 'naver-blog' | 'tistory' | 'own-blog';

export interface VideoItem {
    id: string;
    title: string;
    summary: string;
    platform: VideoPlatform;
    duration: string;
    views: string;
    thumbnail: string;
    url: string;
}

export interface BlogItem {
    id: string;
    title: string;
    excerpt: string;
    platform: BlogPlatform;
    publishedLabel: string;
    thumbnail: string;
    url: string;
}

export const videoPlatformLabels: Record<VideoPlatform, string> = {
    youtube: '유튜브',
    tiktok: '틱톡',
    instagram: '인스타그램',
    kakao: '카카오',
    naver: '네이버',
};

export const blogPlatformLabels: Record<BlogPlatform, string> = {
    'naver-blog': '네이버 블로그',
    tistory: '티스토리',
    'own-blog': '문정 블로그',
};

/** TODO: 백엔드 연결 시 API 호출 결과로 교체 (docs/content-aggregation-plan.md 참고) */
export const videos: VideoItem[] = [
    {
        id: 'v1',
        title: '쿠팡 셀러 세금, 이것만 알면 됩니다',
        summary: '로켓그로스 수수료 처리부터 부가세 신고까지 핵심 정리',
        platform: 'youtube',
        duration: '0:58',
        views: '2.3만',
        thumbnail: '/images/thumb-1.png',
        url: '#',
    },
    {
        id: 'v2',
        title: '스마트스토어 개인→법인 전환 타이밍',
        summary: '매출 기준별 최적 전환 시점과 절세 효과 비교',
        platform: 'naver',
        duration: '1:12',
        views: '1.8만',
        thumbnail: '/images/thumb-2.png',
        url: '#',
    },
    {
        id: 'v3',
        title: '해외직구 관세 환급, 놓치지 마세요',
        summary: '수입 부가세·관세 환급 절차와 필요 서류 안내',
        platform: 'youtube',
        duration: '0:45',
        views: '1.5만',
        thumbnail: '/images/thumb-3.png',
        url: '#',
    },
    {
        id: 'v4',
        title: '정책자금 100% 활용 가이드',
        summary: '이커머스 사업자가 받을 수 있는 정책자금 총정리',
        platform: 'instagram',
        duration: '1:30',
        views: '3.1만',
        thumbnail: '/images/thumb-4.png',
        url: '#',
    },
    {
        id: 'v5',
        title: '틱톡샵 크로스보더 세금 처리법',
        summary: '해외 플랫폼 정산금 매출 인식 및 신고 방법',
        platform: 'tiktok',
        duration: '0:52',
        views: '9,800',
        thumbnail: '/images/thumb-5.png',
        url: '#',
    },
    {
        id: 'v6',
        title: '종합소득세 vs 법인세, 뭐가 유리할까?',
        summary: '매출 구간별 세금 시뮬레이션으로 최적 선택',
        platform: 'youtube',
        duration: '1:05',
        views: '2.7만',
        thumbnail: '/images/thumb-6.png',
        url: '#',
    },
];
