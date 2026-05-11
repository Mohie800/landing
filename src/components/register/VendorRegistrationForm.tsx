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

import { authApi } from "@/lib/api/auth";
import { uploadApi } from "@/lib/api/upload";
import { vendorApplicationApi } from "@/lib/api/vendor-application";

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
  const [submitError, setSubmitError] = useState("");

  // Auth state
  const [authToken, setAuthToken] = useState<string | null>(null);

  // File state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bankDetailsFile, setBankDetailsFile] = useState<File | null>(null);
  const [commercialRegisterFile, setCommercialRegisterFile] =
    useState<File | null>(null);
  const [taxCertificateFile, setTaxCertificateFile] = useState<File | null>(
    null
  );

  // Upload progress state
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBankDetails, setUploadingBankDetails] = useState(false);
  const [uploadingCommercialRegister, setUploadingCommercialRegister] =
    useState(false);
  const [uploadingTaxCertificate, setUploadingTaxCertificate] = useState(false);

  // Qafila Lab opt-in (Step 2)
  const [qafilaLabRequested, setQafilaLabRequested] = useState(false);

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

  // Upload a file and set the URL in form state
  const uploadFile = async (
    file: File,
    field: keyof FormData,
    setUploading: (v: boolean) => void
  ) => {
    setUploading(true);
    try {
      const url = await uploadApi.uploadDocument(file);
      setValue(field, url, { shouldValidate: true });
    } catch {
      setValue(field, "", { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  };

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file);
    if (file) {
      uploadFile(file, "logo", setUploadingLogo);
    } else {
      setValue("logo", "", { shouldValidate: true });
    }
  };

  const handleBankDetailsChange = (file: File | null) => {
    setBankDetailsFile(file);
    if (file) {
      uploadFile(file, "bankDetails", setUploadingBankDetails);
    } else {
      setValue("bankDetails", "", { shouldValidate: true });
    }
  };

  const handleCommercialRegisterChange = (file: File | null) => {
    setCommercialRegisterFile(file);
    if (file) {
      uploadFile(file, "commercialRegister", setUploadingCommercialRegister);
    } else {
      setValue("commercialRegister", "", { shouldValidate: true });
    }
  };

  const handleTaxCertificateChange = (file: File | null) => {
    setTaxCertificateFile(file);
    if (file) {
      uploadFile(file, "taxCertificate", setUploadingTaxCertificate);
    } else {
      setValue("taxCertificate", "", { shouldValidate: true });
    }
  };

  const handlePolicyChange = (key: string, checked: boolean) => {
    setPolicies((prev) => ({ ...prev, [key]: checked }));
    setPolicyError("");
  };

  const handleContinue = async () => {
    if (currentStep === 1 && !showOtp) {
      const valid = await trigger(
        STEP1_FIELDS as unknown as (keyof FormData)[]
      );
      if (!valid) return;

      // Request OTP
      try {
        await authApi.requestOtp(getValues("phone"));
        setShowOtp(true);
      } catch {
        // Still show OTP screen even if request fails — user can resend
        setShowOtp(true);
      }
      return;
    }

    if (currentStep === 2) {
      const valid = await trigger(
        STEP2_FIELDS as unknown as (keyof FormData)[]
      );
      if (valid) setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      const valid = await trigger(
        STEP3_FIELDS as unknown as (keyof FormData)[]
      );
      if (valid) setCurrentStep(4);
      return;
    }
  };

  const handleOtpVerify = async (otp: string) => {
    const phone = getValues("phone");
    const result = await authApi.verifyOtp(phone, otp);

    // Store token for API calls
    const token = result.accessToken;
    setAuthToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("vendorApplicationToken", token);
    }

    setShowOtp(false);
    setCurrentStep(2);
  };

  const handleOtpResend = async () => {
    await authApi.requestOtp(getValues("phone"));
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
    setSubmitError("");

    try {
      const values = getValues();
      await vendorApplicationApi.submit({
        designerName: values.designerName,
        email: values.email,
        phone: values.phone,
        city: values.city,
        brandName: values.brandName,
        category: values.category,
        storeLink: values.storeLink || undefined,
        brandStory: values.brandStory,
        logo: values.logo,
        bankDetails: values.bankDetails,
        commercialRegister: values.commercialRegister,
        taxCertificate: values.taxCertificate || undefined,
        policiesAccepted: true,
        qafilaLabRequested,
      });
      setSubmitted(true);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || t("submitError");
      setSubmitError(typeof message === "string" ? message : t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
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
                onResend={handleOtpResend}
              />
            )}

            {currentStep === 2 && (
              <StoreSetupStep
                register={register}
                errors={errors}
                logo={logoFile}
                onLogoChange={handleLogoChange}
                isUploadingLogo={uploadingLogo}
                qafilaLabRequested={qafilaLabRequested}
                onQafilaLabChange={setQafilaLabRequested}
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
                isUploadingBankDetails={uploadingBankDetails}
                isUploadingCommercialRegister={uploadingCommercialRegister}
                isUploadingTaxCertificate={uploadingTaxCertificate}
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
              <div className="mt-8 flex flex-col gap-3">
                {submitError && (
                  <p className="text-center text-sm text-red-500">
                    {submitError}
                  </p>
                )}
                <div className="flex items-center justify-between">
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
