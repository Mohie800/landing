"use client";

import { useState } from "react";
import { Crown, Building2, Landmark, SaudiRiyal } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

const planConfigs = [
  { popular: false, ctaStyle: "border" as const, featureIndices: [0, 1] },
  {
    popular: true,
    ctaStyle: "filled" as const,
    featureIndices: [0, 1, 2, 3, 4],
  },
  { popular: false, ctaStyle: "border" as const, featureIndices: [0, 1, 2, 3] },
  {
    popular: false,
    ctaStyle: "border" as const,
    featureIndices: [0, 1, 2, 3, 4],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<"b2b" | "b2g">("b2b");
  const t = useTranslations("pricing");

  return (
    <section
      className="relative overflow-hidden bg-peach-bg py-20"
      id="pricing"
    >
      {/* Decorative circles */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -start-20 h-64 w-64 rounded-full bg-primary/20"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-primary/15"
      />
      <Image
        src={"/images/patterns2.svg"}
        alt="patterns"
        height={400}
        width={600}
        className="absolute bottom-0 w-full"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-sm text-gray-text">{t("label")}</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-dark-bg lg:text-4xl">
              <span className="text-primary">{t("titleHighlight")}</span>{" "}
              {t("titleEnd")}
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex overflow-hidden rounded-full border border-light-border">
            <button
              onClick={() => setActiveTab("b2b")}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition ${
                activeTab === "b2b"
                  ? "bg-dark-bg text-white"
                  : "bg-white text-dark-bg hover:bg-gray-50"
              }`}
            >
              <Building2 className="h-4 w-4" />
              {t("businessTab")}
            </button>
            <button
              onClick={() => setActiveTab("b2g")}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition ${
                activeTab === "b2g"
                  ? "bg-dark-bg text-white"
                  : "bg-white text-dark-bg hover:bg-gray-50"
              }`}
            >
              <Landmark className="h-4 w-4" />
              {t("governmentTab")}
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {planConfigs.map((plan, idx) => {
            const originalPrice = t.has(`plans.${idx}.originalPrice`)
              ? t(`plans.${idx}.originalPrice`)
              : null;
            const discount = t.has(`plans.${idx}.discount`)
              ? t(`plans.${idx}.discount`)
              : null;

            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative rounded-2xl border bg-white p-6 ${
                  plan.popular
                    ? "border-primary shadow-lg"
                    : "border-light-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dark-bg px-4 py-1 text-xs font-medium text-white">
                    {t("mostPopular")}
                  </div>
                )}

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark-bg">
                    {t(`plans.${idx}.name`)}
                  </h3>
                  <Crown className="h-5 w-5 text-primary/40" />
                </div>

                <p className="mb-4 text-xs text-gray-text">
                  {t("planDescription")}
                </p>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-sm">
                    <SaudiRiyal />
                  </span>
                  <span className="text-3xl font-bold text-dark-bg">
                    {t(`plans.${idx}.price`)}
                  </span>
                  {originalPrice && (
                    <>
                      <span className="text-sm text-gray-text line-through">
                        {originalPrice}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {discount}
                      </span>
                    </>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`mb-6 w-full rounded-lg py-2.5 text-sm font-semibold transition ${
                    plan.ctaStyle === "filled"
                      ? "bg-dark-bg text-white hover:bg-black"
                      : "border border-light-border text-dark-bg hover:bg-gray-50"
                  }`}
                >
                  {t(`plans.${idx}.cta`)}
                </button>

                {/* Features */}
                <p className="mb-3 text-xs font-medium text-dark-bg">
                  {t("subscriptionNote")}
                </p>
                <ul className="space-y-2">
                  {plan.featureIndices.map((fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 text-xs text-gray-text"
                    >
                      <span className="mt-0.5 text-primary">&#10003;</span>
                      {t(`features.${fIdx}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Compare button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-dark-bg hover:text-white hover:scale-105 active:scale-95"
          >
            {t("compareAll")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
