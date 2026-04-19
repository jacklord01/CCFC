import { getArticleBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewsDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: any = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { title, excerpt, publishedDate, featuredImage, body } = article;

  return (
    <main style={{ backgroundColor: "#FFFFFF", maxWidth: "1920px", margin: "0 auto" }}>
      
      {/* --- FRAME 9: Section Header / Divider --- */}
      <section id="frame-9" style={{ 
        boxSizing: "border-box", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "12px 180px", 
        gap: "607px", 
        width: "100%", 
        height: "94px", 
        borderBottom: "1px solid #EAEAEA" 
      }}>
         <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "303px", height: "70px" }}>
            <Image src="/CCFC-Logo.png" alt="Club Logo" width={50} height={50} />
            <span style={{ fontWeight: 800, fontSize: "20px", color: "#008236" }}>CASTLEBAR CELTIC FC</span>
         </div>
         <nav style={{ display: "flex", gap: "32px", fontWeight: "600", fontSize: "16px", color: "#6B7280" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>HOME</Link>
            <Link href="/news" style={{ textDecoration: "none", color: "#008236" }}>NEWS</Link>
            <Link href="/teams" style={{ textDecoration: "none", color: "inherit" }}>TEAMS</Link>
         </nav>
      </section>

      {/* --- FRAME 11: Navigation / Breadcrumbs --- */}
      <section id="frame-11" style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        padding: "24px 180px", 
        gap: "10px", 
        width: "100%", 
        height: "77px", 
        color: "#008236",
        fontSize: "16px",
        fontWeight: "500"
      }}>
         <Link href="/news" style={{ color: "#6B7280", textDecoration: "none" }}>News</Link>
         <span>/</span>
         <span style={{ fontWeight: 700 }}>{title}</span>
      </section>

      {/* --- HERO SECTION --- */}
      <section style={{ 
        position: "relative",
        height: "562px",
        width: "100%",
        background: `linear-gradient(0deg, rgba(11, 17, 29, 0.6), rgba(11, 17, 29, 0.6)), url('${featuredImage || "/image.jpg"}'), #D9D9D9`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 180px 60px"
      }}>
        <div style={{ maxWidth: "1253px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
            <span style={{ fontSize: "24px" }}>📅</span>
            <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px" }}>
              {new Date(publishedDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h1 style={{ 
              fontFamily: "Inter", fontWeight: 600, fontSize: "60px", lineHeight: "83px",
              textTransform: "uppercase", color: "white", textShadow: "4px 10px 48px rgba(0,0,0,0.37)",
              margin: 0
            }}>
              {title}
            </h1>
            <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "26px", color: "white", margin: 0 }}>
              {excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* --- FRAME 10: Main Content Row --- */}
      <section id="frame-10" style={{ 
        padding: "60px 180px", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        gap: "40px" 
      }}>
        {/* Body Content */}
        <div style={{ flex: "1 1 937px", maxWidth: "937px", display: "flex", flexDirection: "column", gap: "30px" }}>
           <div style={{ fontFamily: "Inter", fontSize: "18px", lineHeight: "1.8", color: "#0B111D" }} className="rich-content">
             {body && documentToReactComponents(body)}
           </div>

           {/* Branded "Legacy" Image Layout */}
           <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
              <div style={{ display: "flex", gap: "20px", height: "400px" }}>
                 <div style={{ flex: "3", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <Image src="/media__1775348197260.jpg" alt="Gallery 1" fill style={{ objectFit: "cover" }} />
                 </div>
                 <div style={{ flex: "2", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <Image src="/media__1775348198184.jpg" alt="Gallery 2" fill style={{ objectFit: "cover" }} />
                 </div>
              </div>
           </div>
        </div>

        {/* --- SIDEBAR --- */}
        <aside style={{ width: "380px", display: "flex", flexDirection: "column", gap: "48px" }}>
          
          {/* Table of Contents */}
          <div style={{ border: "1px solid #EAEAEA", borderRadius: "12px", padding: "32px", backgroundColor: "#F9FAFB" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0B111D", textTransform: "uppercase", marginBottom: "24px", borderLeft: "4px solid #008236", paddingLeft: "16px" }}>
              TABLE OF CONTENTS
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Introduction: The Heartbeat of the Community",
                "A Proud Tradition in Irish Football",
                "The History of Castlebar Celtic FC",
                "Developing the Next Generation",
                "Youth Academy and Grassroots Football",
                "A Club Built on Community",
                "Matchday Atmosphere and Supporters",
                "Facilities and Club Development",
                "Looking Ahead: The Future of Castlebar Celtic FC"
              ].map((item, idx) => (
                <li key={idx} style={{ color: "#008236", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", gap: "8px" }}>
                   <span style={{ color: "#D1D5DB" }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
             <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0B111D", margin: 0 }}>SHARE THIS ARTICLE</h4>
             <div style={{ display: "flex", gap: "12px" }}>
                <SocialIcon color="#1877F2" icon="f" label="Facebook" />
                <SocialIcon color="#0A66C2" icon="in" label="LinkedIn" />
                <SocialIcon color="#E4405F" icon="IG" label="Instagram" />
                <SocialIcon color="#000000" icon="𝕏" label="X" />
                <SocialIcon color="#25D366" icon="w" label="WhatsApp" />
             </div>
          </div>
        </aside>
      </section>

      {/* --- FOOTER CTA --- */}
      <section style={{ backgroundColor: "#008236", padding: "80px 180px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
         <div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 8px 0" }}>JOIN THE JOURNEY</h2>
            <p style={{ fontSize: "18px", margin: 0, opacity: 0.9 }}>Support Celtic's next century of success.</p>
         </div>
         <Link href="/join" style={{ backgroundColor: "white", color: "#008236", padding: "16px 40px", borderRadius: "8px", fontWeight: "800", textDecoration: "none", fontSize: "18px" }}>
            Become a Member →
         </Link>
      </section>
    </main>
  );
}

function SocialIcon({ color, icon, label }: { color: string, icon: string, label: string }) {
  return (
    <div title={label} style={{ 
      width: "44px", height: "44px", backgroundColor: color, 
      borderRadius: "8px", display: "flex", alignItems: "center", 
      justifyContent: "center", cursor: "pointer", transition: "opacity 0.2s" 
    }}>
      <span style={{ color: "white", fontWeight: "900", fontSize: "18px" }}>{icon}</span>
    </div>
  );
}

