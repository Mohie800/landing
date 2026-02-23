import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeIn from "./animations/FadeIn";
import ScaleIn from "./animations/ScaleIn";
import TextReveal from "./animations/TextReveal";

export default async function CTASection() {
  const t = await getTranslations("cta");

  return (
    <section className="bg-dark-bg py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-0.5 w-8 bg-primary" />
            <span className="text-sm text-white">{t("label")}</span>
          </div>
        </FadeIn>
        <TextReveal>
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            {t("title")}
          </h2>
        </TextReveal>
        <FadeIn delay={0.2}>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/60">
            {t("description")}
          </p>
        </FadeIn>
        <ScaleIn delay={0.3}>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-3 text-sm font-semibold text-dark-text bg-primary transition hover:bg-amber-500 hover:text-dark-bg hover:scale-105 active:scale-95"
          >
            {t("registerNow")}
          </Link>
        </ScaleIn>
      </div>
    </section>
  );
}
