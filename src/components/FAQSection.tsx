"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const t = useTranslations("faq");

  return (
    <section className="bg-peach-bg py-20">
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
            <span className="text-sm text-[#101618]">{t("label")}</span>
          </div>
          <h2 className="text-3xl font-bold text-dark-bg lg:text-4xl">
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* FAQ Accordion */}
          <div className="space-y-3 lg:col-span-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="overflow-hidden rounded-lg border border-light-border bg-white"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  className="flex w-full items-center justify-between px-6 py-4 text-start transition hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-dark-bg">
                    {t(`questions.${idx}.question`)}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === idx ? (
                      <Minus className="h-5 w-5 shrink-0 text-gray-text" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-gray-text" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-light-border px-6 pb-4 pt-3">
                        <p className="text-sm leading-relaxed text-gray-text">
                          {t(`questions.${idx}.answer`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-dark-bg p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                <Image
                  src={"/images/messages.svg"}
                  alt="messages"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">
                {t("contact.title")}
              </h3>
              <p className="mb-4 text-sm text-white/60">
                {t("contact.description")}
              </p>
              <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark hover:scale-105 active:scale-95">
                {t("contact.button")}
              </button>
            </motion.div>

            {/* Phone card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-light-border bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Image
                    src={"/images/phone.svg"}
                    alt="phone"
                    height={20}
                    width={20}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-text">
                    {t("phone.comfort")}
                  </p>
                  <p className="text-lg font-bold text-primary" dir="ltr">
                    {t("phone.number")}
                  </p>
                  <p className="text-xs text-gray-text">{t("phone.service")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
