"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface OtpVerificationProps {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

export default function OtpVerification({
  phone,
  onVerify,
  onBack,
}: OtpVerificationProps) {
  const t = useTranslations("register");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const digit = value.slice(-1);
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...Array(6)].map((_, i) => pasted[i] || "");
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }, []);

  const isComplete = otp.every((d) => d !== "");
  const maskedPhone = phone
    ? `+966 ${phone.slice(0, 2)}${"*".repeat(Math.max(0, phone.length - 4))}${phone.slice(-2)}`
    : "+966 *********";

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-dark-bg">
        {t("otp.title")}
      </h2>
      <p className="mb-8 text-sm text-gray-text">
        {t("otp.subtitle")}{" "}
        <span dir="ltr" className="font-medium text-dark-bg">
          {maskedPhone}
        </span>
      </p>

      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-medium text-dark-bg">
            {t("otp.enterCode")}
          </label>
          <div dir="ltr" className="flex justify-center gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="h-12 w-12 rounded-lg border border-light-border text-center text-lg font-semibold outline-none transition focus:border-primary"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-text">
            {t("otp.didntReceive")}{" "}
            {timer > 0 ? (
              <span className="text-gray-text">
                {t("otp.resendIn")} {timer}
                {t("otp.seconds")}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(60)}
                className="font-medium text-primary transition hover:underline"
              >
                {t("otp.resend")}
              </button>
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-light-border px-6 py-2.5 text-sm font-medium text-dark-bg transition hover:bg-gray-50"
          >
            {t("back")}
          </button>
          <button
            type="button"
            onClick={onVerify}
            disabled={!isComplete}
            className="flex-1 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("otp.verify")}
          </button>
        </div>
      </div>
    </div>
  );
}
