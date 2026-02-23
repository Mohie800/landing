import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import WhyQafilaSection from "@/components/WhyQafilaSection";
import WhoWeServeSection from "@/components/WhoWeServeSection";
import VisionSection from "@/components/VisionSection";
import PricingSection from "@/components/PricingSection";
import PartnersFormSection from "@/components/PartnersFormSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowWeWorkSection />
        <WhyQafilaSection />
        <WhoWeServeSection />
        <VisionSection />
        <PricingSection />
        <PartnersFormSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
