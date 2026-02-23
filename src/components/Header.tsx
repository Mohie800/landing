"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gettingStartedOpen, setGettingStartedOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setGettingStartedOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      className={`absolute top-0 left-0 right-0 z-50 ${!isHome ? "bg-dark-bg" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <Image src={"/logo-header.svg"} alt="logo" height={80} width={180} />
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden items-center gap-8 lg:flex"
        >
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setGettingStartedOpen(!gettingStartedOpen)}
              className="flex items-center gap-1 text-sm text-white/90 transition hover:text-white cursor-pointer"
            >
              {t("gettingStarted")}{" "}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${gettingStartedOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {gettingStartedOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute start-0 top-full mt-3 w-56 overflow-hidden rounded-sm bg-white shadow-lg"
                >
                  <div className="divide-y divide-gray-100">
                    <a
                      href="#how-to-sell"
                      className="group relative block px-6 py-4 text-sm font-medium text-dark-bg transition hover:bg-primary/5"
                    >
                      <span className="absolute inset-y-0 start-0 w-1 origin-left scale-y-0 rounded-e bg-primary transition-transform group-hover:scale-y-100" />
                      {t("forBusinessSeller")}
                    </a>
                    <a
                      href="#"
                      className="group relative block px-6 py-4 text-sm font-medium text-dark-bg transition hover:bg-primary/5"
                    >
                      <span className="absolute inset-y-0 start-0 w-1 origin-left scale-y-0 rounded-e bg-primary transition-transform group-hover:scale-y-100" />
                      {t("forGovernmentSupplier")}
                    </a>
                    <a
                      href="#partner-with-us"
                      className="group relative block px-6 py-4 text-sm font-medium text-dark-bg transition hover:bg-primary/5"
                    >
                      <span className="absolute inset-y-0 start-0 w-1 origin-left scale-y-0 rounded-e bg-primary transition-transform group-hover:scale-y-100" />
                      {t("forStartup")}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/how-to-sell"
            className="text-sm text-white/90 transition hover:text-white"
          >
            {t("howToSell")}
          </Link>
          <a
            href="#about"
            className="text-sm text-white/90 transition hover:text-white"
          >
            {t("aboutUs")}
          </a>
          <button className="flex items-center gap-1 rounded-full border border-primary px-4 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white">
            {t("priceAccess")} <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </motion.nav>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden items-center gap-4 lg:flex"
        >
          {/* Country flag */}
          <div className="flex items-center gap-1">
            <Image
              src="/images/sa.svg"
              alt="Saudi Arabia"
              width={28}
              height={20}
              className="rounded-sm"
            />
            <ChevronDown className="h-3.5 w-3.5 text-white/70" />
          </div>
          {/* Language */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 text-sm text-white/90 transition hover:text-white"
          >
            <Globe className="h-4 w-4" />
            {t("language")}
          </button>
        </motion.div>

        {/* Mobile toggle */}
        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur lg:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-4">
              <div>
                <span className="text-sm font-medium text-white/70">
                  {t("gettingStarted")}
                </span>
                <div className="mt-2 flex flex-col gap-2 ps-4">
                  <a href="#" className="text-sm text-white/90">
                    {t("forBusinessSeller")}
                  </a>
                  <a href="#" className="text-sm text-white/90">
                    {t("forGovernmentSupplier")}
                  </a>
                  <a href="#" className="text-sm text-white/90">
                    {t("forStartup")}
                  </a>
                </div>
              </div>
              <Link href="/how-to-sell" className="text-sm text-white/90">
                {t("howToSell")}
              </Link>
              <a href="#about" className="text-sm text-white/90">
                {t("aboutUs")}
              </a>
              <a href="#pricing" className="text-sm text-primary">
                {t("priceAccess")}
              </a>
              <div className="flex items-center gap-2 pt-2">
                <Image
                  src="/images/sa.svg"
                  alt="Saudi Arabia"
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <span className="text-sm text-white/90">+966</span>
              </div>
              <button
                onClick={switchLocale}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/90">{t("language")}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
