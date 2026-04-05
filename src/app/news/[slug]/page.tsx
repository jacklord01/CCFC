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

  const { title, details, date, featuredImage, content } = article.fields;

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      {/* 1. Header Hero with Uppercase Title and Text-Shadow */}
      <section style={{ 
        position: "relative",
        height: "562px",
        background: `linear-gradient(0deg, rgba(11, 17, 29, 0.6), rgba(11, 17, 29, 0.6)), url('${featuredImage?.fields?.file?.url || "/image.jpg"}'), #D9D9D9`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 180px 60px"
      }}>
        <div style={{ maxWidth: "1253px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Publication Date */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
            <span style={{ fontSize: "24px" }}>📅</span>
            <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px" }}>
              {new Date(date || article.sys.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
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
              {details}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Article Content with Sidebar Table of Contents */}
      <section style={{ padding: "50px 180px", display: "flex", justifyContent: "center", gap: "40px" }}>
        {/* Left Column: Body Content */}
        <div style={{ flex: 1, maxWidth: "937px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontFamily: "Inter", fontSize: "16px", lineHeight: "26px", color: "#0B111D" }} className="rich-content">
            {documentToReactComponents(content)}
          </div>

          {/* Dynamic Image Layout (Example logic for multiple images) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "30px" }}>
             <div style={{ display: "flex", gap: "20px", height: "380px" }}>
                <div style={{ flex: "0 0 440px", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                   <Image src="/media__1775348197260.jpg" alt="Legacy Image 1" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: "1 1 477px", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                   <Image src="/media__1775348198184.jpg" alt="Legacy Image 2" fill style={{ objectFit: "cover" }} />
                </div>
             </div>
             <div style={{ display: "flex", gap: "20px", height: "380px" }}>
                <div style={{ flex: "1 1 610px", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                   <Image src="/media__1775348198209.jpg" alt="Legacy Image 3" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: "0 0 307px", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                   <Image src="/media__1775348198227.jpg" alt="Legacy Image 4" fill style={{ objectFit: "cover" }} />
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <aside style={{ width: "583px", display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Table of Contents */}
          <div style={{ boxSizing: "border-box", border: "1px solid #D2D1D4", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "20px", color: "#0B111D", textTransform: "uppercase", margin: 0 }}>
              TABLE OF CONTENTS
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px", fontSize: "18px", color: "#008236" }}>
              <li>Introduction: The Heartbeat of the Community</li>
              <li>A Proud Tradition in Irish Football</li>
              <li>The History of Castlebar Celtic FC</li>
              <li>Developing the Next Generation</li>
              <li>Youth Academy and Grassroots Football</li>
              <li>A Club Built on Community</li>
              <li>Matchday Atmosphere and Supporters</li>
              <li>Facilities and Club Development</li>
              <li>Achievements and Milestones</li>
              <li>Looking Ahead: The Future of Castlebar Celtic FC</li>
              <li>Join the Journey</li>
            </ul>
          </div>

          {/* Social Share Icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
             <h4 style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "20px", color: "#0B111D", letterSpacing: "-0.02em", margin: 0 }}>Share on</h4>
             <div style={{ display: "flex", gap: "18px" }}>
                <div style={{ width: "36px", height: "36px", backgroundColor: "#1877F2", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <span style={{ color: "white", fontWeight: "bold" }}>f</span>
                </div>
                <div style={{ width: "36px", height: "36px", backgroundColor: "#0A66C2", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <span style={{ color: "white", fontWeight: "bold" }}>in</span>
                </div>
                <div style={{ width: "36px", height: "36px", background: "radial-gradient(92% 99% at 26% 107%, #FFDD55 0%, #FF543E 50%, #C837AB 100%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <span style={{ color: "white", fontWeight: "bold" }}>IG</span>
                </div>
                <div style={{ width: "36px", height: "36px", backgroundColor: "#0B111D", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <span style={{ color: "white", fontWeight: "bold" }}>X</span>
                </div>
                <div style={{ width: "36px", height: "36px", background: "linear-gradient(0deg, #1FAF38 -9900%, #60D669 100%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <span style={{ color: "white", fontWeight: "bold" }}>W</span>
                </div>
             </div>
          </div>
        </aside>
      </section>

      {/* 3. Lotto / Community Banner exactly as requested */}
      <section style={{ backgroundColor: "#008236", padding: "75px 180px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
           <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "24px" }}>🏆</span>
           </div>
           <div style={{ display: "flex", flexDirection: "column" }}>
              <h5 style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "18px", color: "white", margin: 0 }}>Join Our Community</h5>
              <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "white", margin: 0 }}>Join our exciting fundraiser! Every punt counts towards the club's future.</p>
           </div>
        </div>
        <Link href="/join" style={{ backgroundColor: "white", color: "#008236", padding: "10px 24px", borderRadius: "4px", fontWeight: "600", fontSize: "16px", textDecoration: "none" }}>
           Get Involved →
        </Link>
      </section>
    </main>
  );
}

