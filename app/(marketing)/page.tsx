import Hero from '@/components/sections/Hero';
import PlatformTabs from '@/components/sections/PlatformTabs';
import CFORoadmap from '@/components/sections/CFORoadmap';
import ContentSection from '@/components/sections/ContentSection';
import StatsSection from '@/components/sections/StatsSection';
import TeamSection from '@/components/sections/TeamSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';
import { faqs } from '@/lib/faq-data';
import { getFAQJsonLd } from '@/lib/seo';

export default function MarketingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQJsonLd(faqs)) }}
            />
            <Hero />
            <PlatformTabs />
            <CFORoadmap />
            <ContentSection />
            <StatsSection />
            <TeamSection />
            <PricingSection />
            <FAQSection />
            <Footer />
        </>
    );
}
