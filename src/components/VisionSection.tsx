import { Play } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import FadeIn from "./animations/FadeIn";
import ScaleIn from "./animations/ScaleIn";
import TextReveal from "./animations/TextReveal";

export default async function VisionSection() {
  const t = await getTranslations("vision");
  const pt = await getTranslations("platformTour");

  return (
    <section className="bg-white py-20" id="about">
      <div className="mx-auto max-w-7xl px-6">
        {/* Our Vision */}
        <FadeIn>
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 border border-slate-200 p-3 rounded-2xl">
            {/* Video placeholder */}
            <ScaleIn delay={0.2}>
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-light-border bg-gray-100">
                <span className="text-sm text-gray-400">
                  {t("videoPlaceholder")}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 cursor-pointer">
                    <Play className="h-6 w-6 text-dark-bg" />
                  </div>
                </div>
                <span className="absolute bottom-4 start-4 text-xs text-gray-500">
                  {t("videoCaption")}
                </span>
              </div>
            </ScaleIn>

            {/* Content */}
            <div>
              <FadeIn delay={0.1}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-0.5 w-8 bg-primary" />
                  <span className="text-sm text-[#101618]">{t("label")}</span>
                </div>
              </FadeIn>
              <TextReveal delay={0.2}>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-dark-bg lg:text-4xl">
                  {t("titleStart")}{" "}
                  <span className="text-primary">{t("titleHighlight")}</span>{" "}
                  {t("titleEnd")}
                </h2>
              </TextReveal>
              <ul className="space-y-3">
                {[0, 1].map((idx) => (
                  <FadeIn key={idx} delay={0.3 + idx * 0.1} direction="right" distance={20}>
                    <li className="flex items-start gap-2 text-sm leading-relaxed text-gray-text">
                      <span className="mt-1 text-primary">&bull;</span>
                      {t(`bullets.${idx}`)}
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Platform Tour */}
        <FadeIn>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 border border-slate-200 p-3 rounded-2xl">
            {/* Content */}
            <div>
              <FadeIn delay={0.1}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-0.5 w-8 bg-primary" />
                  <span className="text-sm text-[#101618]">{pt("label")}</span>
                </div>
              </FadeIn>
              <TextReveal delay={0.2}>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-dark-bg lg:text-4xl">
                  {pt("titleStart")}{" "}
                  <span className="text-primary">{pt("titleHighlight")}</span>{" "}
                  {pt("titleEnd")}
                </h2>
              </TextReveal>
              <ul className="mb-8 space-y-3">
                {[0, 1].map((idx) => (
                  <FadeIn key={idx} delay={0.3 + idx * 0.1} direction="left" distance={20}>
                    <li className="flex items-start gap-2 text-sm leading-relaxed text-gray-text">
                      <span className="mt-1 text-primary">&bull;</span>
                      {pt(`bullets.${idx}`)}
                    </li>
                  </FadeIn>
                ))}
              </ul>
              {/* App store badges */}
              <FadeIn delay={0.5}>
                <div className="flex flex-wrap gap-3">
                  <button className="flex bg-[#2C2C2E] px-4 py-2 rounded-lg gap-2 transition hover:scale-105 active:scale-95">
                    <Image
                      src={"/images/apple.svg"}
                      alt="apple"
                      width={30}
                      height={30}
                    />
                    <div className="text-white">
                      <div className="text-sm">{pt("downloadOn")}</div>
                      <div className="text-2xl font-medium">
                        {pt("appStore")}
                      </div>
                    </div>
                  </button>
                  <button className="flex bg-[#2C2C2E] px-4 py-2 rounded-lg gap-2 transition hover:scale-105 active:scale-95">
                    <Image
                      src={"/images/play.svg"}
                      alt="play"
                      width={30}
                      height={30}
                    />
                    <div className="text-white">
                      <div className="text-sm text-start">{pt("getItOn")}</div>
                      <div className="text-2xl font-medium">
                        {pt("googlePlay")}
                      </div>
                    </div>
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Video placeholder */}
            <ScaleIn delay={0.2}>
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-light-border bg-gray-100">
                <span className="text-sm text-gray-400">
                  {pt("videoPlaceholder")}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 cursor-pointer">
                    <Play className="h-6 w-6 text-dark-bg" />
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
