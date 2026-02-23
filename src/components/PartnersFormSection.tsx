"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

export default function PartnersFormSection() {
  const t = useTranslations("partners");

  return (
    <section className="bg-white py-20" id="partner-with-us">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-0.5 w-8 bg-primary" />
            <span className="text-sm text-[#101618] font-medium">
              {t("label")}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-dark-bg lg:text-4xl">
            {t("titleStart")}{" "}
            <span className="text-primary">{t("titleHighlight1")}</span>,{" "}
            <span className="text-primary">{t("titleHighlight2")}</span> &amp;
            <br />
            {t("titleEnd")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left info card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center rounded-2xl bg-dark-bg p-8 lg:col-span-2"
          >
            <div className="space-y-8">
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
                >
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {t(`categories.${idx}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {t(`categories.${idx}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.designerName")}{" "}
                    <span className="text-primary">{t("form.required")}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.enterName")}
                    className="w-full rounded-lg border border-light-border px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.emailAddress")}{" "}
                    <span className="text-primary">{t("form.required")}</span>
                  </label>
                  <input
                    type="email"
                    placeholder={t("form.enterEmail")}
                    className="w-full rounded-lg border border-light-border px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.phoneNumber")}{" "}
                    <span className="text-primary">{t("form.required")}</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-light-border px-4 py-2.5">
                    <div className="flex items-center gap-1.5 border-e border-light-border pe-3">
                      <Image
                        src="/images/sa.svg"
                        alt="Saudi Arabia"
                        width={24}
                        height={16}
                        className="rounded-sm"
                      />
                      <span className="text-xs text-gray-text">+966</span>
                    </div>
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder={t("form.phonePlaceholder")}
                      className="w-full text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.city")}{" "}
                    <span className="text-primary">{t("form.required")}</span>
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-light-border px-4 py-2.5 text-sm text-gray-text outline-none transition focus:border-primary">
                      <option>{t("form.selectCity")}</option>
                      <option>{t("form.cities.riyadh")}</option>
                      <option>{t("form.cities.jeddah")}</option>
                      <option>{t("form.cities.dammam")}</option>
                      <option>{t("form.cities.mecca")}</option>
                      <option>{t("form.cities.medina")}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.brandName")}{" "}
                    <span className="text-primary">{t("form.required")}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.brandNamePlaceholder")}
                    className="w-full rounded-lg border border-light-border px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                    {t("form.category")}
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-light-border px-4 py-2.5 text-sm text-gray-text outline-none transition focus:border-primary">
                      <option>{t("form.selectCategory")}</option>
                      <option>{t("form.categories.fashion")}</option>
                      <option>{t("form.categories.food")}</option>
                      <option>{t("form.categories.electronics")}</option>
                      <option>{t("form.categories.homeGarden")}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark-bg">
                  {t("form.brandStory")}{" "}
                  <span className="text-primary">{t("form.required")}</span>
                </label>
                <textarea
                  placeholder={t("form.brandStoryPlaceholder")}
                  rows={4}
                  className="w-full rounded-lg border border-light-border px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-dark-bg px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-black hover:scale-105 active:scale-95"
                >
                  {t("form.submit")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
