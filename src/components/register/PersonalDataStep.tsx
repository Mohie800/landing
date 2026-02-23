"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormData } from "./VendorRegistrationForm";

const CITIES = [
  "riyadh",
  "jeddah",
  "dammam",
  "mecca",
  "medina",
  "khobar",
  "tabuk",
  "abha",
  "taif",
  "buraidah",
] as const;

interface PersonalDataStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function PersonalDataStep({
  register,
  errors,
}: PersonalDataStepProps) {
  const t = useTranslations("register");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-dark-bg">
        {t("step1.title")}
      </h2>
      <p className="mb-8 text-sm text-gray-text">{t("step1.subtitle")}</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Designer Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step1.designerName")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="text"
              placeholder={t("step1.designerNamePlaceholder")}
              {...register("designerName")}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.designerName ? "border-red-300" : "border-light-border"
              }`}
            />
            {errors.designerName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.designerName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step1.email")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="email"
              placeholder={t("step1.emailPlaceholder")}
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.email ? "border-red-300" : "border-light-border"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step1.phone")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                errors.phone ? "border-red-300" : "border-light-border"
              }`}
            >
              <div className="flex items-center gap-1.5 border-e border-light-border pe-3">
                <Image src="/images/sa.svg" alt="Saudi Arabia" width={24} height={16} className="rounded-sm" />
                <span className="text-xs text-gray-text">+966</span>
              </div>
              <input
                type="tel"
                dir="ltr"
                placeholder={t("step1.phonePlaceholder")}
                {...register("phone")}
                className="w-full text-sm outline-none"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step1.city")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <div className="relative">
              <select
                {...register("city")}
                className={`w-full appearance-none rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                  errors.city ? "border-red-300" : "border-light-border"
                }`}
              >
                <option value="">{t("step1.selectCity")}</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {t(`step1.cities.${city}`)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
