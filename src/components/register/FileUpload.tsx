"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface FileUploadProps {
  accept: string;
  maxSizeMB: number;
  hint: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  variant?: "image" | "pdf";
}

export default function FileUpload({
  accept,
  maxSizeMB,
  hint,
  value,
  onChange,
  error,
  variant = "pdf",
}: FileUploadProps) {
  const t = useTranslations("register");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > maxSizeMB * 1024 * 1024) return;
      onChange(file);
    },
    [maxSizeMB, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
        {variant === "image" ? (
          <ImageIcon className="h-5 w-5 text-primary" />
        ) : (
          <FileText className="h-5 w-5 text-primary" />
        )}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-dark-bg">
            {value.name}
          </p>
          <p className="text-xs text-gray-text">
            {(value.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="text-gray-text transition hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition ${
          dragOver
            ? "border-primary bg-primary/5"
            : error
              ? "border-red-300 bg-red-50"
              : "border-light-border hover:border-primary/50"
        }`}
      >
        <Upload
          className={`mb-3 h-8 w-8 ${dragOver ? "text-primary" : "text-gray-text"}`}
        />
        <p className="text-sm text-gray-text">
          {t("dragDrop")}{" "}
          <span className="font-medium text-primary">{t("browse")}</span>
        </p>
        <p className="mt-1 text-xs text-gray-text">
          {hint}
        </p>
        <p className="mt-1 text-xs text-gray-text">
          {t("maxSize")} {maxSizeMB}MB
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
