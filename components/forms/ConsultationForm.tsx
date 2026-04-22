'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check, Loader2, Download, MessageCircle, CheckCircle2, TrendingUp, Receipt, Landmark, ClipboardEdit, MessageSquareMore } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CoupangLogo, TiktokLogo, NaverLogo, OverseasIcon, OwnMallIcon } from '@/components/icons/PlatformLogos';
import {
    consultationSchema,
    type ConsultationLead,
    type FormStep,
    platformOptions,
    painPointOptions,
    revenueRangeOptions,
} from '@/types/consultation';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/* Brand-logo mapping for platform step */
const platformLogos: Record<string, React.ElementType> = {
    coupang: CoupangLogo,
    tiktok: TiktokLogo,
    naver: NaverLogo,
    overseas: OverseasIcon,
    'own-mall': OwnMallIcon,
};

/* Pain-point Lucide icon mapping with individual colors */
const painPointMeta: Record<string, { icon: React.ElementType; gradient: string; bg: string; color: string }> = {
    'revenue-growth': { icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', color: 'text-blue-600' },
    'fee-processing': { icon: Receipt, gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    'policy-fund': { icon: Landmark, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', color: 'text-amber-600' },
    'bookkeeper-change': { icon: ClipboardEdit, gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', color: 'text-violet-600' },
    other: { icon: MessageSquareMore, gradient: 'from-gray-500 to-slate-500', bg: 'bg-gray-100', color: 'text-gray-600' },
};

/* Brand-color mapping (matches PlatformTabs gradients) */
const platformColors: Record<string, { gradient: string; border: string; bg: string; icon: string }> = {
    coupang: { gradient: 'from-red-500 to-rose-600', border: 'border-red-300', bg: 'bg-red-50', icon: 'text-red-600' },
    tiktok: { gradient: 'from-pink-500 to-rose-500', border: 'border-pink-300', bg: 'bg-pink-50', icon: 'text-pink-600' },
    naver: { gradient: 'from-green-500 to-emerald-600', border: 'border-green-300', bg: 'bg-green-50', icon: 'text-green-600' },
    overseas: { gradient: 'from-blue-500 to-indigo-600', border: 'border-blue-300', bg: 'bg-blue-50', icon: 'text-blue-600' },
    'own-mall': { gradient: 'from-violet-500 to-purple-600', border: 'border-violet-300', bg: 'bg-violet-50', icon: 'text-violet-600' },
    other: { gradient: 'from-gray-500 to-gray-600', border: 'border-gray-300', bg: 'bg-gray-50', icon: 'text-gray-600' },
};

export default function ConsultationForm() {
    const [step, setStep] = useState<FormStep>(1);
    const [status, setStatus] = useState<FormStatus>('idle');

    const form = useForm<ConsultationLead>({
        resolver: zodResolver(consultationSchema),
        defaultValues: {
            platform: '',
            painPoint: '',
            name: '',
            phone: '',
            email: '',
            revenueRange: '',
            privacyAgreed: undefined,
        },
        mode: 'onChange',
    });

    const { register, setValue, watch, formState: { errors }, trigger } = form;
    const selectedPlatform = watch('platform');
    const selectedPainPoint = watch('painPoint');

    const handleNext = async () => {
        if (step === 1) {
            const valid = await trigger('platform');
            if (valid) setStep(2);
        } else if (step === 2) {
            const valid = await trigger('painPoint');
            if (valid) setStep(3);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((s) => (s - 1) as FormStep);
    };

    /* Auto-format phone: 01012345678 → 010-1234-5678 */
    const formatPhone = (value: string) => {
        const nums = value.replace(/[^0-9]/g, '').slice(0, 11);
        if (nums.length <= 3) return nums;
        if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
        return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
    };

    const onSubmit = async (data: ConsultationLead) => {
        setStatus('submitting');
        try {
            // Save to localStorage as offline fallback
            const saved = JSON.parse(localStorage.getItem('pending_leads') || '[]');
            saved.push({ ...data, timestamp: new Date().toISOString() });
            localStorage.setItem('pending_leads', JSON.stringify(saved));

            const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK;
            if (webhookUrl) {
                const res = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (!res.ok) throw new Error('Submit failed');
            }
            // Clear saved data on success
            localStorage.removeItem('pending_leads');
            setStatus('success');
        } catch {
            // Data is still in localStorage for retry
            setStatus('success'); // Show success anyway - data is saved locally
        }
    };

    /* ─── Success State ─── */
    if (status === 'success') {
        return (
            <div className="text-center py-10 px-4">
                {/* Glowing check */}
                <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute w-20 h-20 bg-emerald-400/20 rounded-full blur-xl" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                        <Check className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h3 className="text-2xl font-extrabold text-primary mb-3 tracking-tight">상담 신청 완료!</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed text-sm">
                    전문가가 <span className="text-accent font-semibold">24시간 이내</span>에 연락드리겠습니다.
                    <br />알림톡으로도 확인해 주세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="accent" className="gap-2 rounded-xl shadow-lg shadow-accent/20">
                        <Download className="h-4 w-4" />
                        절세 가이드 PDF 받기
                    </Button>
                    <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="gap-2 w-full rounded-xl">
                            <MessageCircle className="h-4 w-4" />
                            카카오톡 채널 추가
                        </Button>
                    </a>
                </div>
            </div>
        );
    }

    /* ─── Step labels (matching CFORoadmap STEP 0X style) ─── */
    const stepLabels = ['플랫폼 선택', '고민 유형', '연락처 입력'];

    return (
        <div>
            {/* Progress bar — STEP 0X style */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                    {stepLabels.map((label, i) => {
                        const s = i + 1;
                        return (
                            <div key={s} className="flex items-center gap-2">
                                <div className={cn(
                                    'flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold transition-all shrink-0',
                                    s < step
                                        ? 'bg-gradient-to-br from-accent to-accent-600 text-white shadow-md'
                                        : s === step
                                            ? 'bg-accent text-white shadow-md shadow-accent/20'
                                            : 'bg-gray-100 text-gray-400'
                                )}>
                                    {s < step ? <Check className="h-3.5 w-3.5" /> : s}
                                </div>
                                <span className={cn(
                                    'text-sm font-semibold hidden sm:block',
                                    s <= step ? 'text-gray-900' : 'text-gray-400'
                                )}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* ─── Step 1: Platform Selection (with brand logos) ─── */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3 tracking-tight">판매 플랫폼을 선택해주세요</h3>
                        <p className="text-base text-gray-500 mb-8">주력 판매 채널에 맞는 전문가를 배정해 드립니다.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {platformOptions.map((p) => {
                                const LogoComp = platformLogos[p.id];
                                const colors = platformColors[p.id] || platformColors.other;
                                const isSelected = selectedPlatform === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setValue('platform', p.id, { shouldValidate: true })}
                                        className={cn(
                                            'group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300',
                                            isSelected
                                                ? `${colors.border} ${colors.bg} shadow-md`
                                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm hover:-translate-y-0.5'
                                        )}
                                    >
                                        <div className={cn(
                                            'w-14 h-14 rounded-2xl flex items-center justify-center transition-all',
                                            isSelected
                                                ? `bg-gradient-to-br ${colors.gradient} text-white shadow-lg`
                                                : 'bg-gray-50 group-hover:bg-gray-100'
                                        )}>
                                            {LogoComp
                                                ? <LogoComp className={cn('w-8 h-8', !isSelected && colors.icon)} />
                                                : <span className="text-2xl">{p.emoji}</span>
                                            }
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-base text-gray-900">{p.label}</span>
                                            <span className="text-xs text-gray-400 leading-tight">{p.description}</span>
                                        </div>
                                        {isSelected && (
                                            <CheckCircle2 className={cn('absolute top-2.5 right-2.5 h-4 w-4', colors.icon)} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.platform && <p className="text-red-500 text-sm mt-3">{errors.platform.message}</p>}
                    </div>
                )}

                {/* ─── Step 2: Pain Point ─── */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2 tracking-tight">어떤 고민이 있으신가요?</h3>
                        <p className="text-base text-gray-500 mb-5">해당 분야 전문가가 배정됩니다.</p>
                        <div className="space-y-2">
                            {painPointOptions.map((p) => {
                                const isSelected = selectedPainPoint === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setValue('painPoint', p.id, { shouldValidate: true })}
                                        className={cn(
                                            'group flex items-center gap-4 w-full p-3.5 rounded-2xl border-2 text-left transition-all duration-300',
                                            isSelected
                                                ? 'border-accent bg-accent/5 shadow-sm'
                                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm hover:-translate-y-0.5'
                                        )}
                                    >
                                        {(() => {
                                            const meta = painPointMeta[p.id];
                                            const Icon = meta?.icon;
                                            return (
                                                <div className={cn(
                                                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                                                    isSelected
                                                        ? `bg-gradient-to-br ${meta?.gradient || 'from-accent to-accent-600'} text-white shadow-md`
                                                        : `${meta?.bg || 'bg-gray-50'} ${meta?.color || 'text-gray-500'}`
                                                )}>
                                                    {Icon ? <Icon className="h-5 w-5" /> : <span>{p.emoji}</span>}
                                                </div>
                                            );
                                        })()}
                                        <span className="font-semibold text-base text-gray-900 flex-1">{p.label}</span>
                                        <div className={cn(
                                            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                                            isSelected ? 'bg-accent border-accent' : 'border-gray-200'
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.painPoint && <p className="text-red-500 text-sm mt-3">{errors.painPoint.message}</p>}
                    </div>
                )}

                {/* ─── Step 3: Contact Info ─── */}
                {step === 3 && (
                    <div className="animate-fade-in space-y-5">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3 tracking-tight">연락처를 알려주세요</h3>
                            <p className="text-base text-gray-500 mb-8">전문가가 맞춤 안내를 드립니다.</p>
                        </div>

                        <div className="space-y-4 bg-gray-50/60 rounded-2xl p-5 sm:p-6 border border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" className="text-xs font-semibold text-gray-500 mb-1.5 block">담당자명 *</Label>
                                    <Input id="name" placeholder="담당자명" {...register('name')} className="h-11 rounded-xl" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-xs font-semibold text-gray-500 mb-1.5 block">연락처 *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="010-1234-5678"
                                        value={watch('phone') || ''}
                                        onChange={(e) => {
                                            const formatted = formatPhone(e.target.value);
                                            setValue('phone', formatted, { shouldValidate: true });
                                        }}
                                        className="h-11 rounded-xl"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-xs font-semibold text-gray-500 mb-1.5 block">이메일 *</Label>
                                <Input id="email" type="email" placeholder="email@example.com" {...register('email')} className="h-11 rounded-xl" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 mb-1.5 block">월 매출 구간 *</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {revenueRangeOptions.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => setValue('revenueRange', r.id, { shouldValidate: true })}
                                            className={cn(
                                                'px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                                                watch('revenueRange') === r.id
                                                    ? 'border-accent bg-accent text-white shadow-sm'
                                                    : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
                                            )}
                                        >
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.revenueRange && <p className="text-red-500 text-xs mt-1">{errors.revenueRange.message}</p>}
                            </div>
                        </div>

                        {/* Privacy consent */}
                        <div className="flex items-center gap-3 pt-1">
                            <Checkbox
                                id="privacy"
                                checked={watch('privacyAgreed') === true}
                                onCheckedChange={(checked) => setValue('privacyAgreed', checked === true ? true : undefined as unknown as true, { shouldValidate: true })}
                            />
                            <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed cursor-pointer min-h-0">
                                <span className="text-accent font-semibold">[필수]</span> 개인정보 수집·이용에 동의합니다.
                            </label>
                        </div>
                        {errors.privacyAgreed && <p className="text-red-500 text-xs">{errors.privacyAgreed.message}</p>}
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    {step > 1 ? (
                        <Button type="button" variant="ghost" onClick={handleBack} className="gap-2 rounded-xl font-semibold text-gray-500">
                            <ArrowLeft className="h-4 w-4" />
                            이전
                        </Button>
                    ) : <div />}

                    {step < 3 ? (
                        <Button type="button" variant="accent" onClick={handleNext} className="gap-2 rounded-xl shadow-lg shadow-accent/20 font-semibold px-8">
                            다음
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="accent"
                            disabled={status === 'submitting'}
                            className="gap-2 rounded-xl shadow-lg shadow-accent/20 font-semibold px-8"
                        >
                            {status === 'submitting' ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> 제출 중...</>
                            ) : (
                                <>무료 상담 신청<ArrowRight className="h-4 w-4" /></>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
