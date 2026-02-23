import Image from "next/image";
import { getTranslations } from "next-intl/server";
import FadeIn from "./animations/FadeIn";
import TextReveal from "./animations/TextReveal";
import { StaggerContainer, StaggerItem } from "./animations/StaggerChildren";

export default async function WhoWeServeSection() {
  const t = await getTranslations("whoWeServe");

  return (
    <section className="bg-dark-bg py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <FadeIn>
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-0.5 w-8 bg-primary" />
              <span className="text-sm text-white">{t("label")}</span>
            </div>
          </FadeIn>
          <TextReveal>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              {t("titleStart")}{" "}
              <span className="text-primary">{t("titleHighlight1")}</span>
              <br />
              <span className="text-primary">{t("titleHighlight2")}</span>{" "}
              {t("titleEnd")}
            </h2>
          </TextReveal>
        </div>

        {/* Card 1 - Business Growth */}
        <FadeIn direction="left" distance={60} className="mb-8">
          <div className="overflow-hidden rounded-lg rounded-tl-[67px] bg-[#333333]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image placeholder */}
              <div className="flex items-center justify-center bg-[#333333] text-sm text-gray-400 lg:aspect-auto lg:min-h-[350px]">
                <Image
                  src={"/images/growth.svg"}
                  alt="growth"
                  width={500}
                  height={500}
                  className="w-full p-2"
                />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {t("business.title")}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/60">
                  {t("business.description")}
                </p>
                <StaggerContainer stagger={0.1}>
                  <ul className="mb-6 space-y-3">
                    {[0, 1, 2].map((idx) => (
                      <StaggerItem key={idx} direction="right" distance={20}>
                        <li className="flex items-center gap-3 text-sm text-white/80">
                          <Image
                            src={"/images/check.svg"}
                            alt="check"
                            height={20}
                            width={20}
                          />
                          {t(`business.features.${idx}`)}
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-dark"
                >
                  {t("business.learnMore")}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Card 2 - Government Procurement */}
        <FadeIn direction="right" distance={60}>
          <div className="overflow-hidden rounded-lg rounded-tr-[67px] bg-[#333333]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="order-2 flex flex-col justify-center p-8 lg:order-1 lg:p-12">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {t("government.title")}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/60">
                  {t("government.description")}
                </p>
                <StaggerContainer stagger={0.1}>
                  <ul className="mb-6 space-y-3">
                    {[0, 1, 2].map((idx) => (
                      <StaggerItem key={idx} direction="left" distance={20}>
                        <li className="flex items-center gap-3 text-sm text-white/80">
                          <Image
                            src={"/images/check.svg"}
                            alt="check"
                            height={20}
                            width={20}
                          />
                          {t(`government.features.${idx}`)}
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-dark"
                >
                  {t("government.learnMore")}
                </a>
              </div>
              {/* Image placeholder */}
              <div className="order-1 flex items-center justify-center bg-[#333333] text-sm text-gray-400 lg:order-2 lg:aspect-auto lg:min-h-[350px]">
                <Image
                  src={"/images/government.svg"}
                  alt="growth"
                  width={500}
                  height={500}
                  className="w-full p-2"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
