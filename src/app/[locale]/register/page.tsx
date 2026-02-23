import { setRequestLocale } from "next-intl/server";
import VendorRegistrationForm from "@/components/register/VendorRegistrationForm";
import Header from "@/components/Header";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <VendorRegistrationForm />
        </div>
      </main>
    </>
  );
}
