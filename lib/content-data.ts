/**
 * 콘텐츠 섹션(영상+블로그)의 데이터 레이어.
 *
 * 지금은 정적 더미 데이터지만, 실제로는 여러 채널에서 자동 수집한
 * 콘텐츠 중 조회수 상위 항목을 보여주는 게 목표입니다.
 * 백엔드 연결 시 이 파일의 videos/blogPosts 배열을 API 호출 결과로
 * 교체하면 되고, 컴포넌트(ContentSection.tsx)는 손댈 필요 없습니다.
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
    readTime: string;
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

/** TODO: 백엔드 연결 시 네이버블로그/티스토리/자사블로그 글 목록으로 교체 */
export const blogPosts: BlogItem[] = [
    {
        id: 'b1',
        title: '이커머스 셀러가 놓치기 쉬운 부가세 신고 체크리스트',
        excerpt: '분기마다 헷갈리는 부가세 신고, 이 5가지만 확인하세요.',
        platform: 'naver-blog',
        readTime: '5분',
        thumbnail: '/images/thumb-1.png',
        url: '#',
    },
    {
        id: 'b2',
        title: '흑자인데 통장은 마이너스? 돈맥경화 진단법',
        excerpt: '정산 지연과 재고 비용이 만드는 현금흐름 함정 파헤치기',
        platform: 'tistory',
        readTime: '7분',
        thumbnail: '/images/thumb-2.png',
        url: '#',
    },
    {
        id: 'b3',
        title: '정책자금 신청, 이 서류부터 준비하세요',
        excerpt: '경영지도사가 알려주는 정책자금 신청 전 필수 체크포인트',
        platform: 'naver-blog',
        readTime: '6분',
        thumbnail: '/images/thumb-3.png',
        url: '#',
    },
    {
        id: 'b4',
        title: '간이과세자에서 일반과세자로, 언제 전환해야 할까',
        excerpt: '매출 구간별 전환 타이밍과 세금 영향 비교',
        platform: 'own-blog',
        readTime: '4분',
        thumbnail: '/images/thumb-4.png',
        url: '/consultation/',
    },
    {
        id: 'b5',
        title: '반품·교환 비용, 이익률 계산에 넣고 계신가요?',
        excerpt: '실제 수익성을 갉아먹는 숨은 비용 짚어보기',
        platform: 'tistory',
        readTime: '5분',
        thumbnail: '/images/thumb-5.png',
        url: '#',
    },
    {
        id: 'b6',
        title: '절세와 탈세, 정확히 뭐가 다를까',
        excerpt: '합법적으로 세금을 아끼는 방법과 노하우 정리',
        platform: 'naver-blog',
        readTime: '6분',
        thumbnail: '/images/thumb-6.png',
        url: '#',
    },
];
