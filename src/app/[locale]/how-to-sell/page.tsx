import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowToSellPageClient from "@/components/how-to-sell/HowToSellPageClient";

export default async function HowToSellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <HowToSellPageClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
