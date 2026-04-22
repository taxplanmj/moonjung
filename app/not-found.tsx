import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-6xl font-extrabold text-primary/10 mb-4">404</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">페이지를 찾을 수 없습니다</h1>
                <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
                <Link href="/">
                    <Button variant="accent" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        홈으로 돌아가기
                    </Button>
                </Link>
            </div>
        </div>
    );
}
