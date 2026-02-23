import Image from "next/image";
import { getTranslations } from "next-intl/server";
// import FadeIn from "./animations/FadeIn";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    // <FadeIn direction="none" duration={0.5} >
    <footer className="bg-[#E8983A] py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={"/logo-footer.svg"} alt="logo" height={30} width={100} />
        </div>

        {/* Copyright */}
        <p className="text-sm text-white">{t("copyright")}</p>

        {/* Vision 2030 placeholder */}
        <Image src={"/vision.svg"} alt="vision 2030" height={30} width={60} />
      </div>
    </footer>
    // </FadeIn>
  );
}
