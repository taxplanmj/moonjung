import { z } from 'zod';

export type Platform = 'coupang' | 'naver' | 'own-mall' | 'overseas' | 'tiktok' | 'other';

export interface PlatformOption {
    id: Platform;
    label: string;
    emoji: string;
    description: string;
}

export const platformOptions: PlatformOption[] = [
    { id: 'coupang', label: '쿠팡', emoji: '🛒', description: '로켓그로스/마켓플레이스' },
    { id: 'tiktok', label: '틱톡샵', emoji: '🎵', description: '틱톡샵/라이브커머스' },
    { id: 'naver', label: '네이버', emoji: '🟢', description: '스마트스토어/쇼핑라이브' },
    { id: 'overseas', label: '해외직구', emoji: '📦', description: '아마존/이베이/수입대행' },
    { id: 'own-mall', label: '자사몰', emoji: '🌐', description: '카페24/고도몰/Shopify' },
    { id: 'other', label: '기타', emoji: '💼', description: '오프라인/기타 채널' },
];

export type PainPoint = 'revenue-growth' | 'fee-processing' | 'policy-fund' | 'bookkeeper-change' | 'other';

export interface PainPointOption {
    id: PainPoint;
    label: string;
    emoji: string;
}

export const painPointOptions: PainPointOption[] = [
    { id: 'revenue-growth', label: '매출 증가에 따른 세금 부담', emoji: '📈' },
    { id: 'fee-processing', label: '수수료/비용 처리 문의', emoji: '💳' },
    { id: 'policy-fund', label: '정책자금/지원금 활용', emoji: '🏛️' },
    { id: 'bookkeeper-change', label: '기장 변경/신규 기장', emoji: '📋' },
    { id: 'other', label: '기타 문의', emoji: '💬' },
];

export type RevenueRange = 'under-50m' | '50m-100m' | '100m-500m' | '500m-1b' | 'over-1b';

export const revenueRangeOptions: { id: RevenueRange; label: string }[] = [
    { id: 'under-50m', label: '5천만원 미만' },
    { id: '50m-100m', label: '5천만원 ~ 1억' },
    { id: '100m-500m', label: '1억 ~ 5억' },
    { id: '500m-1b', label: '5억 ~ 10억' },
    { id: 'over-1b', label: '10억 이상' },
];

export const consultationSchema = z.object({
    platform: z.string().min(1, '판매 플랫폼을 선택해주세요'),
    painPoint: z.string().min(1, '고민 유형을 선택해주세요'),
    name: z.string().min(2, '이름을 2자 이상 입력해주세요'),
    phone: z.string().min(10, '올바른 연락처를 입력해주세요').regex(/^[0-9-]+$/, '숫자와 하이픈만 입력'),
    email: z.string().email('올바른 이메일을 입력해주세요'),
    revenueRange: z.string().min(1, '월 매출 구간을 선택해주세요'),
    privacyAgreed: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용에 동의해주세요' }) }),
});

export type ConsultationLead = z.infer<typeof consultationSchema>;
export type FormStep = 1 | 2 | 3;
