import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '개인정보처리방침',
    description: '문정세무회계컨설팅 개인정보처리방침',
};

export default function PrivacyPage() {
    return (
        <section className="section-container section-padding">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 tracking-tight">
                    개인정보처리방침
                </h1>
                <p className="text-sm text-gray-400 mb-12">시행일자: 2026년 8월 23일</p>

                <div className="space-y-10 text-gray-700 leading-relaxed">
                    <p>
                        문정세무회계컨설팅(이하 &lsquo;회사&rsquo;)은 「개인정보 보호법」 등 관련 법령을 준수하며,
                        이용자의 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
                    </p>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">1. 수집하는 개인정보 항목 및 수집 방법</h2>
                        <p className="mb-3">회사는 무료 상담 신청 시 아래 항목을 수집합니다.</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>필수 항목: 담당자명, 연락처, 이메일, 판매 플랫폼, 고민 유형, 월 매출 구간</li>
                            <li>수집 방법: 홈페이지 내 상담 신청 폼을 통한 이용자 직접 입력</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">2. 개인정보의 수집 및 이용 목적</h2>
                        <p>
                            수집한 개인정보는 상담 신청 접수, 담당 전문가 배정, 상담 진행 및 결과 안내 목적으로만
                            이용하며, 목적 외 용도로 이용하지 않습니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">3. 개인정보의 보유 및 이용 기간</h2>
                        <p>
                            이용자의 개인정보는 원칙적으로 상담 목적이 달성된 후(상담 완료일로부터 6개월 이내)
                            지체 없이 파기합니다. 다만 관계 법령의 규정에 따라 보존할 필요가 있는 경우 회사는
                            해당 법령에서 정한 기간 동안 개인정보를 보관합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">4. 개인정보의 제3자 제공</h2>
                        <p>
                            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 상담 신청 처리를
                            위해 필요한 범위 내에서 업무를 위탁하는 경우, 위탁 사실과 수탁자, 위탁 업무 내용을
                            사전에 고지하고 동의를 받습니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">5. 정보주체의 권리와 행사 방법</h2>
                        <p className="mb-3">이용자는 개인정보와 관련하여 다음의 권리를 언제든지 행사할 수 있습니다.</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>개인정보 열람 요구</li>
                            <li>오류 등이 있을 경우 정정 요구</li>
                            <li>삭제 요구</li>
                            <li>처리 정지 요구</li>
                        </ul>
                        <p className="mt-3">
                            위 권리 행사는 아래 &lsquo;개인정보 보호책임자&rsquo;에게 서면, 전화, 이메일 등을 통해
                            연락하시면 지체 없이 조치합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">6. 개인정보의 파기 절차 및 방법</h2>
                        <p>
                            회사는 개인정보 보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 해당
                            개인정보를 파기합니다. 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는
                            기술적 방법을 사용하여 삭제합니다.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">7. 개인정보 보호책임자</h2>
                        <p className="mb-3">회사는 개인정보 처리에 관한 업무를 총괄하는 책임자를 다음과 같이 지정합니다.</p>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>성명: 권민수 (대표)</li>
                            <li>연락처: 02-402-2353</li>
                            <li>이메일: taxplanmj@gmail.com</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">8. 개인정보처리방침의 변경</h2>
                        <p>
                            이 개인정보처리방침은 법령, 정책 또는 서비스 내용의 변경에 따라 개정될 수 있으며,
                            내용의 추가·삭제 및 수정이 있는 경우 변경사항 시행 전 홈페이지를 통해 공지합니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
