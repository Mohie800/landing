"use client";

import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";

interface HeroAnimationsProps {
  title: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  registerText: string;
  loginText: string;
}

export default function HeroAnimations({
  title,
  titleHighlight,
  titleEnd,
  description,
  registerText,
  loginText,
}: HeroAnimationsProps) {
  return (
    <>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl"
        >
          {title}{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-primary"
          >
            {titleHighlight}
          </motion.span>{" "}
          {titleEnd}
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link
          href="/register"
          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark hover:scale-105 active:scale-95"
        >
          {registerText}
        </Link>
        <a
          href="#login"
          className="rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white hover:scale-105 active:scale-95"
        >
          {loginText}
        </a>
      </motion.div>
    </>
  );
}

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
