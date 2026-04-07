"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Users, 
  Image as ImageIcon, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Newspaper,
  CreditCard,
  History,
  ShoppingCart,
  ExternalLink
} from "lucide-react";

import { useSession } from "next-auth/react";

export default function AdminSidebar({ sumupLink }: { sumupLink?: string }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  if (status !== "authenticated") return null;

  const email = session?.user?.email || "admin@castlebarceltic.ie";

  const navItems = [
    { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard", category: "General" },
    { href: "/admin/messages", icon: <MessageSquare size={18} />, label: "Inbound Communications", category: "Operations" },
    { href: "/admin/shop", icon: <ShoppingBag size={18} />, label: "Inventory Management", category: "Operations" },
    { href: "/admin/volunteers", icon: <Users size={18} />, label: "Personnel & Staff", category: "Operations" },
    { href: "/admin/gallery", icon: <ImageIcon size={18} />, label: "Media Moderation", category: "Operations" },
    { href: "/admin/news/new", icon: <Newspaper size={18} />, label: "News & Bulletins", category: "Operations" },
    { href: "/admin/audit-log", icon: <History size={18} />, label: "System Audit Log", category: "Security" },
    { href: "/admin/users", icon: <ShieldCheck size={18} />, label: "Team & Permissions", category: "Security" },
    { href: "/admin/settings", icon: <Settings size={18} />, label: "Club System Config", category: "Security" },
  ];

  const categories = ["General", "Operations", "Security"];

  return (
    <aside style={{ 
      width: "300px", 
      backgroundColor: "#0B111D", 
      color: "white", 
      display: "flex", 
      flexDirection: "column",
      boxShadow: "10px 0 30px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      height: "100vh",
      zIndex: 100,
      borderRight: "1px solid rgba(255,255,255,0.05)"
    }}>
      {/* Brand Header */}
      <div style={{ padding: "40px 24px", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ 
            width: "40px", height: "40px", 
            backgroundColor: "#008236", 
            borderRadius: "12px", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            fontSize: "22px", fontWeight: "900",
            boxShadow: "0 0 20px rgba(0,130,54,0.3)" 
          }}>C</div>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "900", letterSpacing: "1px", margin: 0 }}>CELTIC ADMIN</h2>
            <div style={{ fontSize: "10px", color: "#008236", fontWeight: "800", letterSpacing: "2px", marginTop: "2px" }}>SECURED CORE</div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: "0 16px 24px 16px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto" }}>
        {categories.map(cat => (
          <div key={cat}>
            <div style={{ padding: "0 12px 12px 12px", fontSize: "10px", fontWeight: "800", color: "#4B5563", textTransform: "uppercase", letterSpacing: "2px" }}>{cat}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navItems.filter(item => item.category === cat).map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ 
                    display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "10px", 
                    color: isActive ? "white" : "#9ca3af", 
                    backgroundColor: isActive ? "rgba(0,130,54,0.15)" : "transparent",
                    textDecoration: "none", fontSize: "14px", fontWeight: isActive ? "700" : "600", 
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: isActive ? "1px solid rgba(0,130,54,0.3)" : "1px solid transparent"
                  }}>
                    <span style={{ color: isActive ? "#008236" : "inherit", transition: "color 0.2s" }}>{item.icon}</span>
                    {item.label}
                    {isActive && <div style={{ marginLeft: "auto", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#008236" }}></div>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* SumUp Merchandise Section */}
        <div style={{ marginTop: "12px", padding: "12px" }}>
          <a 
            href={sumupLink || "https://sumup.ie/castlebarceltic"} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", 
              padding: "16px", borderRadius: "12px", 
              background: "linear-gradient(135deg, #008236 0%, #005a26 100%)",
              color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "800",
              boxShadow: "0 4px 15px rgba(0,130,54,0.2)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <ShoppingCart size={18} />
            Buy Merchandise
            <ExternalLink size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />
          </a>
        </div>
      </nav>

      {/* User Footer */}
      <div style={{ padding: "24px", backgroundColor: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
         <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ 
              width: "44px", height: "44px", borderRadius: "14px", 
              background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              fontWeight: "700", border: "1px solid rgba(255,255,255,0.05)",
              color: "#008236"
            }}>
               {email?.[0].toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
               <div style={{ fontSize: "14px", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</div>
               <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600" }}>AUTHENTICATED ADMIN</div>
            </div>
         </div>
         <Link href="/api/auth/signout" style={{ 
           display: "flex", alignItems: "center", gap: "10px", color: "#FCA5A5", textDecoration: "none", fontSize: "13px", fontWeight: "800", padding: "12px", borderRadius: "10px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)" 
         }}>
           <LogOut size={16} /> Sign Out (End Session)
         </Link>
      </div>
    </aside>
  );
}
