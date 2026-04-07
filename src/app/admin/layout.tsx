import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import AdminSidebar from "@/components/AdminSidebar";
import { Providers } from "@/components/Providers";
import SecurityEnforcer from "@/components/SecurityEnforcer";
import { getClubSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const settings = await getClubSettings();

  return (
    <Providers>
      <SecurityEnforcer>
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6", maxWidth: "1920px", margin: "0 auto", boxShadow: "0 0 100px rgba(0,0,0,0.1)" }}>
          <AdminSidebar sumupLink={settings.SUMUP_LINK} />
          
          <main style={{ flex: 1, padding: "60px", overflowY: "auto", backgroundColor: "white" }}>
            {children}
          </main>
        </div>
      </SecurityEnforcer>
    </Providers>
  );
}
