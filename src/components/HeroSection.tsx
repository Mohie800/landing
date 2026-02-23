import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroAnimations, { ScrollIndicator } from "./animations/HeroAnimations";

export default async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-dark-bg pt-24 lg:min-h-[700px]">
      {/* Background image */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent rtl:bg-linear-to-l" />

      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-20 lg:py-32">
        {/* Text content */}
        <div className="max-w-xl">
          <HeroAnimations
            title={t("title")}
            titleHighlight={t("titleHighlight")}
            titleEnd={t("titleEnd")}
            description={t("description")}
            registerText={t("registerNow")}
            loginText={t("login")}
          />
        </div>
      </div>

      {/* Animated scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
