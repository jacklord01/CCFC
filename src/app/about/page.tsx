import { getClubSettings } from "@/lib/settings";
import Image from "next/image";

export default async function AboutPage() {
  const settings = await getClubSettings();

  // Fetch volunteers from the database
  let volunteers = [];
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/volunteers`, { cache: "no-store" });
    if (res.ok) {
      volunteers = await res.json();
    }
  } catch (err) {
    console.error("Error fetching volunteers:", err);
  }

  return (
    <main>
      <div className="container section">
        
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
          <h1 style={{ marginBottom: "1.5rem" }}>Club Officers & Volunteers</h1>
          <p className="text-muted" style={{ fontSize: "1.1rem" }}>
            Castlebar Celtic FC is proudly run by a dedicated team of volunteers who give their time 
            and energy to ensuring the finest footballing experience for our community.
          </p>
        </div>
        
        {/* Volunteer 4-Column Grid as per Figma with WhatsApp links */}
        <div className="grid-cols-4">
          {volunteers.length > 0 ? volunteers.map((vol: any) => (
            <div key={vol.id} className="card card-flush" style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "100%", height: "260px", backgroundColor: "var(--background-muted)", position: "relative" }}>
                 {vol.imageUrl ? (
                    <Image 
                      src={vol.imageUrl} 
                      alt={vol.name} 
                      fill 
                      style={{ objectFit: "cover" }}
                    />
                 ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "14px" }}>
                      No Portrait
                    </div>
                 )}
              </div>
              
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                 <div>
                   <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{vol.name}</h3>
                   <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.75rem", fontWeight: "600" }}>{vol.role}</p>
                   <p style={{ color: "var(--text-main)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: "1.4" }}>
                     {vol.description}
                   </p>
                 </div>
                 
                 {/* WhatsApp Icon exclusively as requested */}
                 <div style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                    <a href={`https://wa.me/${settings.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ 
                      width: "40px", height: "40px", 
                      borderRadius: "50%", 
                      backgroundColor: "#25D366", /* WhatsApp Green */
                      color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      textDecoration: "none"
                    }} aria-label={`WhatsApp ${vol.name}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                    </a>
                 </div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: "span 4", textAlign: "center", padding: "4rem", color: "#6b7280" }}>
              No staff members listed yet. Please add them in the admin dashboard.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
