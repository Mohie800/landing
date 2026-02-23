"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

import StepIndicator from "./StepIndicator";
import PersonalDataStep from "./PersonalDataStep";
import OtpVerification from "./OtpVerification";
import StoreSetupStep from "./StoreSetupStep";
import FinancialDataStep from "./FinancialDataStep";
import PolicyAgreementStep from "./PolicyAgreementStep";
import DashboardPreview from "./DashboardPreview";

const formSchema = z.object({
  designerName: z.string().min(1),
  email: z.string().min(1).email(),
  phone: z
    .string()
    .min(1)
    .regex(/^5\d{8}$/),
  city: z.string().min(1),
  brandName: z.string().min(1),
  category: z.string().min(1),
  storeLink: z.string().url().or(z.literal("")),
  brandStory: z.string().min(50),
  logo: z.string().min(1),
  bankDetails: z.string().min(1),
  commercialRegister: z.string().min(1),
  taxCertificate: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const STEP1_FIELDS = ["designerName", "email", "phone", "city"] as const;
const STEP2_FIELDS = [
  "brandName",
  "category",
  "storeLink",
  "brandStory",
  "logo",
] as const;
const STEP3_FIELDS = [
  "bankDetails",
  "commercialRegister",
  "taxCertificate",
] as const;

export default function VendorRegistrationForm() {
  const t = useTranslations("register");
  const [currentStep, setCurrentStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File state (separate from react-hook-form since File objects can't be serialized in zod easily)
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bankDetailsFile, setBankDetailsFile] = useState<File | null>(null);
  const [commercialRegisterFile, setCommercialRegisterFile] =
    useState<File | null>(null);
  const [taxCertificateFile, setTaxCertificateFile] = useState<File | null>(
    null,
  );

  // Policy state
  const [policies, setPolicies] = useState<Record<string, boolean>>({
    productImage: false,
    returnRefund: false,
    privacy: false,
    termsOfUse: false,
    commission: false,
  });
  const [policyError, setPolicyError] = useState("");

  const {
    register,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designerName: "",
      email: "",
      phone: "",
      city: "",
      brandName: "",
      category: "",
      storeLink: "",
      brandStory: "",
      logo: "",
      bankDetails: "",
      commercialRegister: "",
      taxCertificate: "",
    },
  });

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file);
    setValue("logo", file ? file.name : "", { shouldValidate: true });
  };

  const handleBankDetailsChange = (file: File | null) => {
    setBankDetailsFile(file);
    setValue("bankDetails", file ? file.name : "", { shouldValidate: true });
  };

  const handleCommercialRegisterChange = (file: File | null) => {
    setCommercialRegisterFile(file);
    setValue("commercialRegister", file ? file.name : "", {
      shouldValidate: true,
    });
  };

  const handleTaxCertificateChange = (file: File | null) => {
    setTaxCertificateFile(file);
    setValue("taxCertificate", file ? file.name : "", { shouldValidate: true });
  };

  const handlePolicyChange = (key: string, checked: boolean) => {
    setPolicies((prev) => ({ ...prev, [key]: checked }));
    setPolicyError("");
  };

  const handleContinue = async () => {
    if (currentStep === 1 && !showOtp) {
      const valid = await trigger(
        STEP1_FIELDS as unknown as (keyof FormData)[],
      );
      if (valid) setShowOtp(true);
      return;
    }

    if (currentStep === 2) {
      const valid = await trigger(
        STEP2_FIELDS as unknown as (keyof FormData)[],
      );
      if (valid) setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      const valid = await trigger(
        STEP3_FIELDS as unknown as (keyof FormData)[],
      );
      if (valid) setCurrentStep(4);
      return;
    }
  };

  const handleOtpVerify = () => {
    setShowOtp(false);
    setCurrentStep(2);
  };

  const handleOtpBack = () => {
    setShowOtp(false);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const allPoliciesAccepted = Object.values(policies).every(Boolean);
    if (!allPoliciesAccepted) {
      setPolicyError(t("validation.policyRequired"));
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h2 className="mb-2 text-2xl font-bold text-dark-bg">
            {t("successTitle")}
          </h2>
          <p className="mb-8 max-w-md text-sm text-gray-text">
            {t("successMessage")}
          </p>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator currentStep={currentStep} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Form side */}
        <div className="lg:col-span-3">
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && !showOtp && (
              <PersonalDataStep register={register} errors={errors} />
            )}

            {currentStep === 1 && showOtp && (
              <OtpVerification
                phone={getValues("phone")}
                onVerify={handleOtpVerify}
                onBack={handleOtpBack}
              />
            )}

            {currentStep === 2 && (
              <StoreSetupStep
                register={register}
                errors={errors}
                logo={logoFile}
                onLogoChange={handleLogoChange}
              />
            )}

            {currentStep === 3 && (
              <FinancialDataStep
                errors={errors}
                bankDetails={bankDetailsFile}
                commercialRegister={commercialRegisterFile}
                taxCertificate={taxCertificateFile}
                onBankDetailsChange={handleBankDetailsChange}
                onCommercialRegisterChange={handleCommercialRegisterChange}
                onTaxCertificateChange={handleTaxCertificateChange}
              />
            )}

            {currentStep === 4 && (
              <PolicyAgreementStep
                policies={policies}
                onPolicyChange={handlePolicyChange}
                error={policyError}
              />
            )}

            {/* Navigation buttons (not shown during OTP) */}
            {!showOtp && (
              <div className="mt-8 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 rounded-lg border border-light-border px-6 py-2.5 text-sm font-medium text-dark-bg transition hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                    {t("back")}
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    {t("continue")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Dashboard preview side */}
        <div className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-8 -me-[calc((100vw-80rem)/2+1.5rem)]">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
