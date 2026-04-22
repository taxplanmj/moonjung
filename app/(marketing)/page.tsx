import Hero from '@/components/sections/Hero';
import PlatformTabs from '@/components/sections/PlatformTabs';
import CFORoadmap from '@/components/sections/CFORoadmap';
import ShortsGrid from '@/components/sections/ShortsGrid';
import StatsSection from '@/components/sections/StatsSection';
import TeamSection from '@/components/sections/TeamSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PortalBanner from '@/components/sections/PortalBanner';
import Footer from '@/components/sections/Footer';

export default function MarketingPage() {
    return (
        <>
            <Hero />
            <PlatformTabs />
            <CFORoadmap />
            <ShortsGrid />
            <StatsSection />
            <TeamSection />
            <TestimonialsSection />
            <PortalBanner />
            <Footer />
        </>
    );
}
