import Link from "next/link";

const PolicyLayout = ({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) => (
  <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
    {/* Hero */}
    <section style={{
      background: "linear-gradient(0deg, rgba(11,17,29,0.85), rgba(11,17,29,0.85)), url('/football_stadium_1775346359306.png')",
      backgroundSize: "cover", backgroundPosition: "center",
      padding: "80px 0 60px"
    }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 180px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "white" }}>{title}</span>
        </div>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "48px", fontWeight: 700, color: "white", margin: "0 0 12px 0", lineHeight: "1.2" }}>{title}</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: 0 }}>Last updated: {lastUpdated}</p>
      </div>
    </section>

    {/* Content */}
    <section style={{ padding: "60px 0 80px" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 180px" }}>
        <div style={{ display: "flex", gap: "60px", alignItems: "flex-start", flexWrap: "wrap" }}>
          
          {/* Main content */}
          <div style={{ flex: "1 1 600px", fontFamily: "Inter, sans-serif", lineHeight: "26px", fontSize: "16px", color: "#0B111D" }}>
            {children}
          </div>

          {/* Sidebar — other policies */}
          <div style={{ flex: "0 1 280px" }}>
            <div style={{ border: "1px solid #EAEAEA", borderRadius: "8px", padding: "24px", position: "sticky", top: "110px" }}>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 700, color: "#0B111D", margin: "0 0 16px 0" }}>Club Policies</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Privacy Policy", href: "/policies/privacy" },
                  { label: "Cookie Policy", href: "/policies/cookie" },
                  { label: "Terms & Conditions", href: "/policies/terms" },
                  { label: "Child Protection", href: "/policies/child-protection" },
                  { label: "Safeguarding", href: "/policies/safeguarding" },
                  { label: "Code of Conduct", href: "/policies/code-of-conduct" },
                  { label: "Photo & Media Policy", href: "/policies/media" },
                  { label: "Lotto & Fundraising", href: "/policies/lotto-terms" },
                ].map(p => (
                  <li key={p.href}>
                    <Link href={p.href} style={{ fontSize: "14px", color: "#008236", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                      → {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #EAEAEA" }}>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 8px 0" }}>Questions about our policies?</p>
                <a href="mailto:pro@castlebarceltic.ie" style={{ fontSize: "14px", color: "#008236", fontWeight: 600 }}>pro@castlebarceltic.ie</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 700, color: "#0B111D", margin: "32px 0 12px 0", paddingBottom: "8px", borderBottom: "2px solid #008236" }}>{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p style={{ margin: "0 0 16px 0", color: "#374151" }}>{children}</p>
);

export { PolicyLayout, SectionHeading, Paragraph };
