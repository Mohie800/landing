"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

const STEP_IDS = [
  "register",
  "personal-data",
  "verify-phone",
  "setup-store",
  "business-documents",
  "review-policies",
  "store-dashboard",
] as const;

export default function HowToSellPageClient() {
  const t = useTranslations("howToSell");
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target,
            );
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sidebarItems = [
    t("sidebar.step1"),
    t("sidebar.step2"),
    t("sidebar.step3"),
    t("sidebar.step4"),
    t("sidebar.step5"),
    t("sidebar.step6"),
    t("sidebar.step7"),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-gray-text">
        <Link href="/" className="transition hover:text-dark-bg">
          {t("breadcrumb.home")}
        </Link>
        <ChevronRight size={14} className="rtl:rotate-180" />
        <span className="font-medium text-dark-bg">
          {t("breadcrumb.howToSell")}
        </span>
      </nav>

      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-32">
            <nav className="flex flex-col gap-1.5">
              {sidebarItems.map((label, i) => (
                <button
                  key={STEP_IDS[i]}
                  onClick={() => scrollToStep(i)}
                  className={`rounded-lg px-4 py-3.5 text-start text-sm font-medium transition-colors ${
                    activeStep === i
                      ? "bg-primary text-white"
                      : "bg-[#F5F5F5] text-dark-bg hover:bg-[#EBEBEB]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Intro + Step 1 */}
          <section
            ref={(el) => {
              sectionRefs.current[0] = el;
            }}
            id={STEP_IDS[0]}
          >
            <FadeIn>
              <h1 className="text-3xl font-bold text-dark-bg lg:text-4xl">
                {t("intro.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-text">
                {t("intro.description")}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="mt-12 text-2xl font-bold text-dark-bg">
                {t("step1.title")}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-text">
                {t("step1.description")}
              </p>
              <StepImage
                src="/images/how-step1.svg"
                alt={t("step1.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 2 */}
          <section
            ref={(el) => {
              sectionRefs.current[1] = el;
            }}
            id={STEP_IDS[1]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step2.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step2.point1")}</li>
                <li>{t("step2.point2")}</li>
                <li>{t("step2.point3")}</li>
              </ul>
              <StepImage
                src="/images/how-step2.svg"
                alt={t("step2.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 3 */}
          <section
            ref={(el) => {
              sectionRefs.current[2] = el;
            }}
            id={STEP_IDS[2]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step3.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step3.point1")}</li>
                <li>{t("step3.point2")}</li>
                <li>{t("step3.point3")}</li>
              </ul>
              <StepImage
                src="/images/how-step3.svg"
                alt={t("step3.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 4 */}
          <section
            ref={(el) => {
              sectionRefs.current[3] = el;
            }}
            id={STEP_IDS[3]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step4.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step4.point1")}</li>
                <li>{t("step4.point2")}</li>
                <li>{t("step4.point3")}</li>
              </ul>
              <StepImage
                src="/images/how-step4.svg"
                alt={t("step4.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 5 */}
          <section
            ref={(el) => {
              sectionRefs.current[4] = el;
            }}
            id={STEP_IDS[4]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step5.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step5.point1")}</li>
                <li>{t("step5.point2")}</li>
                <li>{t("step5.point3")}</li>
              </ul>
              <StepImage
                src="/images/how-step5.svg"
                alt={t("step5.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 6 */}
          <section
            ref={(el) => {
              sectionRefs.current[5] = el;
            }}
            id={STEP_IDS[5]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step6.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step6.point1")}</li>
                <li>{t("step6.point2")}</li>
                <li>{t("step6.point3")}</li>
              </ul>
              <StepImage
                src="/images/how-step6.svg"
                alt={t("step6.imageAlt")}
                className="mt-6"
              />
            </FadeIn>
          </section>

          {/* Step 7 */}
          <section
            ref={(el) => {
              sectionRefs.current[6] = el;
            }}
            id={STEP_IDS[6]}
            className="mt-20"
          >
            <FadeIn>
              <h2 className="text-2xl font-bold text-dark-bg">
                {t("step7.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-gray-text">
                <li>{t("step7.point1")}</li>
                <li>{t("step7.point2")}</li>
              </ul>
              <StepImage
                src="/images/how-step7.svg"
                alt={t("step7.imageAlt")}
                className="mt-6"
              />
            </FadeIn>

            {/* Sub-section: Products Tab */}
            <FadeIn delay={0.1}>
              <div className="mt-14">
                <h3 className="text-xl font-bold text-dark-bg">
                  {t("step7.productsTab.title")}
                </h3>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-text">
                  <li>{t("step7.productsTab.point1")}</li>
                  <li>{t("step7.productsTab.point2")}</li>
                </ul>
                <StepImage
                  src="/images/how-stepA.svg"
                  alt={t("step7.productsTab.imageAlt")}
                  className="mt-6"
                />
              </div>
            </FadeIn>

            {/* Sub-section: Orders Tab */}
            <FadeIn delay={0.1}>
              <div className="mt-14">
                <h3 className="text-xl font-bold text-dark-bg">
                  {t("step7.ordersTab.title")}
                </h3>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-text">
                  <li>{t("step7.ordersTab.point1")}</li>
                  <li>{t("step7.ordersTab.point2")}</li>
                </ul>
                <StepImage
                  src="/images/how-stepB.svg"
                  alt={t("step7.ordersTab.imageAlt")}
                  className="mt-6"
                />
              </div>
            </FadeIn>

            {/* Sub-section: Statistics Tab */}
            <FadeIn delay={0.1}>
              <div className="mt-14">
                <h3 className="text-xl font-bold text-dark-bg">
                  {t("step7.statisticsTab.title")}
                </h3>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-gray-text">
                  <li>{t("step7.statisticsTab.point1")}</li>
                  <li>{t("step7.statisticsTab.point2")}</li>
                </ul>
                <StepImage
                  src="/images/how-stepC.svg"
                  alt={t("step7.ordersTab.imageAlt")}
                  className="mt-6"
                />
              </div>
            </FadeIn>
          </section>

          {/* Bottom spacing */}
          <div className="h-24" />
        </div>
      </div>
    </>
  );
}

function StepImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="w-full h-auto"
      />
    </div>
  );
}

function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-light-border bg-[#FAFAFA] ${className}`}
    >
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EBEBEB]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-text"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className="text-sm text-gray-text">{label}</p>
      </div>
    </div>
  );
}
