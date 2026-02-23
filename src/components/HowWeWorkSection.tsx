import Image from "next/image";
import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeIn from "./animations/FadeIn";
import { StaggerContainer, StaggerItem } from "./animations/StaggerChildren";
import TextReveal from "./animations/TextReveal";

const stepImages = [
  "/images/step1.svg",
  "/images/step2.svg",
  "/images/step3.svg",
  "/images/step4.svg",
];

export default async function HowWeWorkSection() {
  const t = await getTranslations("howWeWork");

  return (
    <section className="bg-peach-bg py-20 relative" id="how-to-sell">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Label */}
        <FadeIn>
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-0.5 w-8 bg-primary" />
            <span className="text-sm text-[#101618] font-semibold">
              {t("label")}
            </span>
          </div>
        </FadeIn>

        <TextReveal>
          <h2 className="text-3xl font-bold text-dark-bg lg:text-4xl">
            {t("titleStart")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
            <br />
            {t("titleEnd")}
          </h2>
        </TextReveal>

        {/* Steps */}
        <StaggerContainer
          stagger={0.15}
          delay={0.2}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-0"
        >
          {[0, 1, 2, 3].map((idx) => (
            <Fragment key={idx}>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={stepImages[idx]}
                    alt={`step ${idx + 1}`}
                    height={100}
                    width={280}
                  />
                  <h3 className="mb-2 text-sm font-bold text-dark-bg">
                    {t(`steps.${idx}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-text">
                    {t(`steps.${idx}.description`)}
                  </p>
                </div>
              </StaggerItem>
              {idx < 3 && (
                <StaggerItem>
                  <div className="hidden lg:flex items-center justify-center pt-20">
                    <Image
                      src="/images/step-vector.svg"
                      alt=""
                      width={102}
                      height={23}
                      className="rtl:scale-x-[-1]"
                    />
                  </div>
                </StaggerItem>
              )}
            </Fragment>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div className="mt-12">
            <Link
              href="/how-to-sell"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark hover:scale-105 active:scale-95"
            >
              {t("learnMore")}
            </Link>
          </div>
        </FadeIn>
      </div>
      <Image
        src={"/images/pattern1.svg"}
        alt="patterns"
        height={100}
        width={700}
        className="w-full z-20 bg-white absolute bottom-0"
      />
    </section>
  );
}
