import Link from "next/link";
import { ClubSettings } from "@/lib/settings";

export default function Footer({ settings }: { settings: ClubSettings }) {
  return (
    <footer style={{ backgroundColor: "#0B111D", color: "#ffffff", paddingTop: "50px" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-link {
          color: rgba(255,255,255,0.75) !important;
          transition: color 0.15s ease !important;
        }
        .footer-link:hover {
          color: #ffffff !important;
        }
        .whatsapp-footer-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4) !important;
          background-color: #20BA5A !important;
        }
      `}} />
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 180px" }}>
        
        {/* Main footer columns */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "32px"
        }}>

          {/* Col 1 — Brand */}
          <div style={{ flex: "1 1 260px", maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "70px", height: "86px",
                backgroundImage: `url('${settings.CLUB_LOGO}')`,
                backgroundSize: "contain", backgroundRepeat: "no-repeat"
              }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "24px" }}>{settings.CLUB_NAME}</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: "20px" }}>
              Building community through football, celebrating local talent, and fostering the spirit of the game across County Mayo.
            </p>
          </div>

          {/* Col 2 — Quick Links (includes Contact Us as requested) */}
          <div style={{ flex: "1 1 150px" }}>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "20px", lineHeight: "28px" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Matches & Fixtures", href: "/teams" },
                { label: "Results", href: "/teams" },
                { label: "News", href: "/news" },
                { label: "Gallery", href: "/gallery" },
                { label: "Shop", href: "/shop" },
                { label: "Contact Us", href: "/contact" },
                { label: "Admin Portal", href: "/admin" },
              ].map(link => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="footer-link" style={{ fontSize: "14px", lineHeight: "20px", textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Club Policies (all 7 with working routes) */}
          <div style={{ flex: "1 1 170px" }}>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "20px", lineHeight: "28px" }}>Club Policies</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Privacy Policy", href: "/policies/privacy" },
                { label: "Cookie Policy", href: "/policies/cookie" },
                { label: "Terms & Conditions", href: "/policies/terms" },
                { label: "Child Protection", href: "/policies/child-protection" },
                { label: "Safeguarding", href: "/policies/safeguarding" },
                { label: "Code of Conduct", href: "/policies/code-of-conduct" },
                { label: "Photo & Media Policy", href: "/policies/media" },
                { label: "Lotto & Fundraising", href: "/policies/lotto-terms" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link" style={{ fontSize: "14px", lineHeight: "20px", textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact Us (real FB data: Pavilion Road, F23PF62, 087 192 4100) */}
          <div style={{ flex: "1 1 250px" }}>
            <h4 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "20px", lineHeight: "28px" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <svg style={{ flexShrink: 0, marginTop: "2px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <a href="https://maps.google.com/?q=Pavilion+Road+Castlebar+F23PF62" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: "20px", textDecoration: "none" }}>
                  Pavilion Road, Castlebar,<br />Co. Mayo, F23 PF62
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:pro@castlebarceltic.ie" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", textDecoration: "none" }}>pro@castlebarceltic.ie</a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                <a href={`https://wa.me/${settings.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="whatsapp-footer-btn"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    backgroundColor: "#25D366", 
                    padding: "10px 20px", 
                    borderRadius: "50px", 
                    color: "white", 
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  WhatsApp PRO
                </a>
              </li>

            </ul>

            {/* Social Icons */}
            <h6 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px", marginBottom: "12px", lineHeight: "24px" }}>Follow Us</h6>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://www.facebook.com/castlebarcelticfc" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                style={{ width: "40px", height: "40px", backgroundColor: "#008236", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/Castlebarceltic" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                style={{ width: "40px", height: "40px", backgroundColor: "#008236", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.instagram.com/Castlebarceltic1924" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: "40px", height: "40px", backgroundColor: "#008236", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(55, 70, 101, 0.58)", padding: "20px 0", textAlign: "center", marginTop: "0" }}>
        <p style={{ color: "#99A1AF", fontSize: "14px", fontFamily: "Inter, sans-serif", margin: 0 }}>
          © 2025 Castlebar Celtic FC — All rights reserved
        </p>
      </div>
    </footer>
  );
}
