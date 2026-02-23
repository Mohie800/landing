"use client";

import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function DashboardPreview() {
  const t = useTranslations("register");

  return (
    // <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-dark-bg p-8">
    //   <p className="mb-6 text-sm font-medium text-white/60">
    //     {t("dashboardPreview")}
    //   </p>

    //   {/* Mock dashboard UI */}
    //   <div className="w-full max-w-sm space-y-4">
    //     {/* Stats row */}
    //     <div className="grid grid-cols-2 gap-3">
    //       {[
    //         { icon: ShoppingCart, value: "156", label: "Orders" },
    //         { icon: Package, value: "89", label: "Products" },
    //         { icon: Users, value: "1.2K", label: "Customers" },
    //         { icon: BarChart3, value: "SAR 45K", label: "Revenue" },
    //       ].map((stat) => (
    //         <div
    //           key={stat.label}
    //           className="rounded-lg bg-white/5 p-3 text-center"
    //         >
    //           <stat.icon className="mx-auto mb-1 h-4 w-4 text-primary" />
    //           <p className="text-lg font-bold text-white">{stat.value}</p>
    //           <p className="text-xs text-white/40">{stat.label}</p>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Chart placeholder */}
    //     <div className="rounded-lg bg-white/5 p-4">
    //       <div className="mb-3 flex items-center justify-between">
    //         <span className="text-xs font-medium text-white/60">
    //           Sales Overview
    //         </span>
    //         <span className="text-xs text-primary">This Month</span>
    //       </div>
    //       <div className="flex items-end gap-1.5 h-20">
    //         {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
    //           (h, i) => (
    //             <div
    //               key={i}
    //               className="flex-1 rounded-t bg-primary/30"
    //               style={{ height: `${h}%` }}
    //             />
    //           )
    //         )}
    //       </div>
    //     </div>

    //     {/* Recent orders placeholder */}
    //     <div className="rounded-lg bg-white/5 p-4">
    //       <span className="text-xs font-medium text-white/60">
    //         Recent Orders
    //       </span>
    //       <div className="mt-3 space-y-2">
    //         {[1, 2, 3].map((i) => (
    //           <div key={i} className="flex items-center gap-3">
    //             <div className="h-8 w-8 rounded bg-white/10" />
    //             <div className="flex-1">
    //               <div className="h-2 w-24 rounded bg-white/10" />
    //               <div className="mt-1 h-2 w-16 rounded bg-white/5" />
    //             </div>
    //             <div className="h-2 w-12 rounded bg-primary/20" />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full max-h-[500px] overflow-hidden">
      <Image
        src={"/images/signup.svg"}
        alt="dashboard"
        height={300}
        width={700}
        className="h-auto w-full max-w-none"
      />
    </div>
  );
}
