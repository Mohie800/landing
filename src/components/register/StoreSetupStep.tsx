"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormData } from "./VendorRegistrationForm";
import FileUpload from "./FileUpload";

const CATEGORIES = [
  "fashion",
  "jewelry",
  "beauty",
  "home",
  "food",
  "art",
  "electronics",
  "other",
] as const;

interface StoreSetupStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  logo: File | null;
  onLogoChange: (file: File | null) => void;
  isUploadingLogo?: boolean;
  qafilaLabRequested: boolean;
  onQafilaLabChange: (value: boolean) => void;
}

export default function StoreSetupStep({
  register,
  errors,
  logo,
  onLogoChange,
  isUploadingLogo,
  qafilaLabRequested,
  onQafilaLabChange,
}: StoreSetupStepProps) {
  const t = useTranslations("register");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-dark-bg">
        {t("step2.title")}
      </h2>
      <p className="mb-8 text-sm text-gray-text">{t("step2.subtitle")}</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Brand Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step2.brandName")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="text"
              placeholder={t("step2.brandNamePlaceholder")}
              {...register("brandName")}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.brandName ? "border-red-300" : "border-light-border"
              }`}
            />
            {errors.brandName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.brandName.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark-bg">
              {t("step2.category")}{" "}
              <span className="text-primary">{t("required")}</span>
            </label>
            <div className="relative">
              <select
                {...register("category")}
                className={`w-full appearance-none rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                  errors.category ? "border-red-300" : "border-light-border"
                }`}
              >
                <option value="">{t("step2.selectCategory")}</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(`step2.categories.${cat}`)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text" />
            </div>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Store Link */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step2.storeLink")}
          </label>
          <input
            type="url"
            placeholder={t("step2.storeLinkPlaceholder")}
            {...register("storeLink")}
            className="w-full rounded-lg border border-light-border px-4 py-2.5 text-sm outline-none transition focus:border-primary"
          />
        </div>

        {/* Brand Story */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step2.brandStory")}{" "}
            <span className="text-primary">{t("required")}</span>
          </label>
          <textarea
            placeholder={t("step2.brandStoryPlaceholder")}
            rows={4}
            {...register("brandStory")}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
              errors.brandStory ? "border-red-300" : "border-light-border"
            }`}
          />
          {errors.brandStory && (
            <p className="mt-1 text-xs text-red-500">
              {errors.brandStory.message}
            </p>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step2.logo")}{" "}
            <span className="text-primary">{t("required")}</span>
          </label>
          <FileUpload
            accept="image/png,image/jpeg,image/svg+xml"
            maxSizeMB={5}
            hint={t("step2.logoHint")}
            value={logo}
            onChange={onLogoChange}
            error={errors.logo?.message}
            variant="image"
            isUploading={isUploadingLogo}
          />
        </div>

        {/* Qafila Lab opt-in */}
        <div
          className={`relative overflow-hidden rounded-xl border p-5 transition ${
            qafilaLabRequested
              ? "border-amber-300 bg-gradient-to-br from-amber-50 to-white"
              : "border-light-border bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  qafilaLabRequested
                    ? "bg-amber-500 text-white"
                    : "bg-amber-50 text-amber-500"
                }`}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-dark-bg">
                    {t("step2.qafilaLab.title")}
                  </h3>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    {t("step2.qafilaLab.badge")}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-text">
                  {t("step2.qafilaLab.description")}
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={qafilaLabRequested}
              aria-label={t("step2.qafilaLab.title")}
              onClick={() => onQafilaLabChange(!qafilaLabRequested)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                qafilaLabRequested ? "bg-amber-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                  qafilaLabRequested
                    ? "translate-x-5 rtl:-translate-x-5"
                    : "translate-x-0.5 rtl:-translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
