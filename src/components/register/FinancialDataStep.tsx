"use client";

import { useTranslations } from "next-intl";
import type { FieldErrors } from "react-hook-form";
import type { FormData } from "./VendorRegistrationForm";
import FileUpload from "./FileUpload";

interface FinancialDataStepProps {
  errors: FieldErrors<FormData>;
  bankDetails: File | null;
  commercialRegister: File | null;
  taxCertificate: File | null;
  onBankDetailsChange: (file: File | null) => void;
  onCommercialRegisterChange: (file: File | null) => void;
  onTaxCertificateChange: (file: File | null) => void;
  isUploadingBankDetails?: boolean;
  isUploadingCommercialRegister?: boolean;
  isUploadingTaxCertificate?: boolean;
}

export default function FinancialDataStep({
  errors,
  bankDetails,
  commercialRegister,
  taxCertificate,
  onBankDetailsChange,
  onCommercialRegisterChange,
  onTaxCertificateChange,
  isUploadingBankDetails,
  isUploadingCommercialRegister,
  isUploadingTaxCertificate,
}: FinancialDataStepProps) {
  const t = useTranslations("register");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-dark-bg">
        {t("step3.title")}
      </h2>
      <p className="mb-8 text-sm text-gray-text">{t("step3.subtitle")}</p>

      <div className="space-y-6">
        {/* Bank Account Details */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step3.bankDetails")}{" "}
            <span className="text-primary">{t("required")}</span>
          </label>
          <FileUpload
            accept="application/pdf"
            maxSizeMB={10}
            hint={t("step3.bankDetailsHint")}
            value={bankDetails}
            onChange={onBankDetailsChange}
            error={errors.bankDetails?.message}
            isUploading={isUploadingBankDetails}
          />
        </div>

        {/* Commercial Register */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step3.commercialRegister")}{" "}
            <span className="text-primary">{t("required")}</span>
          </label>
          <FileUpload
            accept="application/pdf"
            maxSizeMB={10}
            hint={t("step3.commercialRegisterHint")}
            value={commercialRegister}
            onChange={onCommercialRegisterChange}
            error={errors.commercialRegister?.message}
            isUploading={isUploadingCommercialRegister}
          />
        </div>

        {/* Tax Certificate (Optional) */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-bg">
            {t("step3.taxCertificate")}{" "}
            <span className="text-sm text-gray-text">
              ({t("step3.optional")})
            </span>
          </label>
          <FileUpload
            accept="application/pdf"
            maxSizeMB={10}
            hint={t("step3.taxCertificateHint")}
            value={taxCertificate}
            onChange={onTaxCertificateChange}
            isUploading={isUploadingTaxCertificate}
          />
        </div>
      </div>
    </div>
  );
}
