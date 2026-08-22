import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '이용약관',
    description: '문정세무회계컨설팅 이용약관',
};

export default function TermsPage() {
    return (
        <section className="section-container section-padding">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 tracking-tight">
                    이용약관
                </h1>
                <p className="text-sm text-gray-400 mb-12">시행일자: 2026년 8월 23일</p>

                <div className="space-y-10 text-gray-700 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제1조 (목적)</h2>
                        <p>
                            이 약관은 문정세무회계컨설팅(이하 &lsquo;회사&rsquo;)이 운영하는 홈페이지에서 제공하는
                            상담 신청 서비스(이하 &lsquo;서비스&rsquo;) 이용과 관련하여 회사와 이용자 간의 권리,
                            의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제2조 (용어의 정의)</h2>
                        <p>
                            &lsquo;이용자&rsquo;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말하며,
                            &lsquo;상담 신청&rsquo;이란 이용자가 홈페이지 내 상담 신청 폼을 통해 세무·회계 관련
                            상담을 요청하는 행위를 말합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제3조 (약관의 효력 및 변경)</h2>
                        <p>
                            이 약관은 홈페이지에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위반하지
                            않는 범위에서 이 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정사유를 명시하여
                            현행 약관과 함께 사전에 공지합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제4조 (서비스의 내용)</h2>
                        <p className="mb-3">회사가 제공하는 서비스는 다음과 같습니다.</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>이커머스 셀러 대상 세무·회계·컨설팅 정보 제공</li>
                            <li>무료 상담 신청 접수 및 담당 전문가 배정</li>
                            <li>세무 신고, 정책자금, 절세 관련 안내</li>
                        </ul>
                        <p className="mt-3">
                            홈페이지 및 상담을 통해 제공되는 정보는 일반적인 안내 목적이며, 구체적인 세무 자문
                            및 기장 업무는 별도의 상담과 계약을 통해 제공됩니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제5조 (이용자의 의무)</h2>
                        <p>
                            이용자는 상담 신청 시 정확한 정보를 제공해야 하며, 허위 정보 제공으로 인해 발생하는
                            불이익에 대해 회사는 책임을 지지 않습니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제6조 (회사의 의무)</h2>
                        <p>
                            회사는 이용자가 상담 신청 시 제공한 개인정보를 개인정보처리방침에 따라 안전하게
                            관리하며, 상담 신청 접수 후 합리적인 기간 내에 담당 전문가를 통해 연락드립니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제7조 (면책조항)</h2>
                        <p>
                            홈페이지에 게시된 세무·회계 관련 정보는 일반적인 정보 제공을 목적으로 하며, 개별
                            사안에 대한 구체적인 법적·세무적 효력을 보장하지 않습니다. 실제 세무 신고 및 절세
                            전략은 정식 상담과 계약을 통해 개별 사업 현황에 맞게 제공됩니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">제8조 (분쟁해결 및 관할법원)</h2>
                        <p>
                            이 약관과 관련하여 회사와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법을 적용하며,
                            분쟁이 발생할 경우 민사소송법상의 관할법원에 소를 제기할 수 있습니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">부칙</h2>
                        <p>이 약관은 2026년 8월 23일부터 시행합니다.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
