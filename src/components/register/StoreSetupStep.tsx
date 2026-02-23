"use client";

import { ChevronDown } from "lucide-react";
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
}

export default function StoreSetupStep({
  register,
  errors,
  logo,
  onLogoChange,
  isUploadingLogo,
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
      </div>
    </div>
  );
}
