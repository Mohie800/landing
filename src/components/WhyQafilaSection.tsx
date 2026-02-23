"use client";

import { useState } from "react";
import {
  Building2,
  Landmark,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

const b2bImages = [
  "/images/palm.svg",
  "/images/icon2.svg",
  "/images/icon3.svg",
  "/images/icon4.svg",
];

const b2gIcons = [Landmark, Building2, LayoutDashboard, Megaphone];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function WhyQafilaSection() {
  const [activeTab, setActiveTab] = useState<"b2b" | "b2g">("b2b");
  const t = useTranslations("whyQafila");
  const featureKey = activeTab === "b2b" ? "b2bFeatures" : "b2gFeatures";

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center"
        >
          {/* Left heading */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-0.5 bg-primary"
              />
              <span className="text-sm text-[#101618] font-medium">
                {t("label")}
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-dark-bg lg:text-4xl">
              {t("titleStart")}
              <br />
              <span className="text-primary">{t("titleHighlight")}</span>
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

        {/* Feature cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[0, 1, 2, 3].map((idx) => {
              const Icon = b2gIcons[idx];
              return (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
                  whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-light-border bg-white p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {activeTab === "b2b" ? (
                      <img
                        src={b2bImages[idx]}
                        alt={t(`${featureKey}.${idx}.title`)}
                        className="h-5 w-5"
                      />
                    ) : (
                      <Icon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-dark-bg">
                    {t(`${featureKey}.${idx}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-text">
                    {t(`${featureKey}.${idx}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
