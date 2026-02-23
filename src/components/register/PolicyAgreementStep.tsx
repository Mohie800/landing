"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const POLICY_KEYS = [
  "productImage",
  "returnRefund",
  "privacy",
  "termsOfUse",
  "commission",
] as const;

interface PolicyAgreementStepProps {
  policies: Record<string, boolean>;
  onPolicyChange: (key: string, checked: boolean) => void;
  error?: string;
}

export default function PolicyAgreementStep({
  policies,
  onPolicyChange,
  error,
}: PolicyAgreementStepProps) {
  const t = useTranslations("register");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-dark-bg">
        {t("step4.title")}
      </h2>
      <p className="mb-8 text-sm text-gray-text">{t("step4.subtitle")}</p>

      <div className="space-y-4">
        {POLICY_KEYS.map((key) => (
          <div
            key={key}
            className="flex items-start gap-3 rounded-lg border border-light-border p-4 transition hover:border-primary/30"
          >
            <input
              type="checkbox"
              id={`policy-${key}`}
              checked={policies[key] || false}
              onChange={(e) => onPolicyChange(key, e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-light-border accent-primary"
            />
            <div className="flex-1">
              <label
                htmlFor={`policy-${key}`}
                className="cursor-pointer text-sm font-medium text-dark-bg"
              >
                {t("step4.agreeToPolicy")}{" "}
                {t(`step4.policies.${key}`)}
              </label>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary transition hover:underline"
            >
              {t("step4.readPolicy")}
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
