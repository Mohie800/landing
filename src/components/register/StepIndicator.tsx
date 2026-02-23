"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const STEP_KEYS = [
  "personalData",
  "storeSetup",
  "financialData",
  "policyAgreement",
] as const;

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations("register.steps");

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEP_KEYS.map((key, idx) => {
          const stepNum = idx + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isActive
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-text"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                <span
                  className={`mt-2 text-xs font-medium whitespace-nowrap ${
                    isActive || isCompleted ? "text-primary" : "text-gray-text"
                  }`}
                >
                  <span className="hidden sm:inline">{t(key)}</span>
                  <span className="sm:hidden">{stepNum}</span>
                </span>
              </div>
              {idx < STEP_KEYS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors ${
                    currentStep > stepNum ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
