import Link from "next/link";
import Image from "next/image";

export default function NewsDetailsPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
       {/* Details Hero Outline */}
       <section style={{ 
          background: "linear-gradient(0deg, rgba(11, 17, 29, 0.6), rgba(11, 17, 29, 0.6)), url('/football_stadium_1775346359306.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "434px 0 60px",
          color: "white"
       }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "18px" }}>
                <span>📅</span>
                <span>March 5, 2026</span>
             </div>
             <div>
                <h1 style={{ fontSize: "60px", fontWeight: "600", textTransform: "uppercase", lineHeight: "83px", textShadow: "4px 10px 48px rgba(0, 0, 0, 0.37)", margin: "0 0 16px 0" }}>
                   Castlebar Celtic Core Updates
                </h1>
                <p style={{ fontSize: "26px", margin: 0 }}>Community Success Update</p>
             </div>
          </div>
       </section>

       {/* Article Content Layout */}
       <section style={{ padding: "50px 0" }}>
          <div className="container" style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
             
             {/* Left Text Block */}
             <div style={{ flex: "1 1 900px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{ fontSize: "16px", lineHeight: "26px", color: "#0B111D" }}>
                   In the world of football, success is often measured in trophies, league titles, and big-name signings. But for many clubs, the real victory lies somewhere deeper — in the community they build, the memories they create, and the generations they inspire. Castlebar Celtic FC is one of those clubs.
                </p>
                <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#0B111D", marginTop: "20px" }}>A Proud Tradition</h2>
                <p style={{ fontSize: "16px", lineHeight: "26px", color: "#0B111D" }}>
                   Founded with a passion for the beautiful game, Castlebar Celtic FC has grown into one of the most respected football institutions in the west of Ireland. Based in the vibrant town of Castlebar in County Mayo, the club has become a focal point for football lovers of all ages. Over the years, the green and white colors of Celtic have represented not just a team, but a tradition — a tradition of determination, sportsmanship, and pride in representing the local community.
                </p>
                
                <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#0B111D", marginTop: "20px" }}>Youth Focus</h2>
                <p style={{ fontSize: "16px", lineHeight: "26px", color: "#0B111D" }}>
                   One of the club’s greatest strengths is its commitment to youth development. From grassroots training sessions to competitive youth leagues, Castlebar Celtic FC has long believed that the future of football starts with young players. Many children in the region take their first steps in football wearing the club’s badge. Under the guidance of dedicated coaches and volunteers, these young athletes learn more than just how to pass, shoot, and defend — they learn teamwork, discipline, and confidence. For some, the dream is to go on and play at higher levels of Irish football. For all, the experience becomes a lifelong connection to the game.
                </p>

                <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#0B111D", marginTop: "20px" }}>Moving Forward</h2>
                <p style={{ fontSize: "16px", lineHeight: "26px", color: "#0B111D" }}>
                   As the seasons change and new players step onto the pitch, one thing remains constant — the spirit of Castlebar Celtic FC. Whether you’re a player, a supporter, a volunteer, or simply someone who loves football, there’s always a place for you in the Celtic family. Because at Castlebar Celtic FC, football isn’t just played — it’s lived.
                </p>
                
                {/* Images injected natively */}
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                   <div style={{ flex: "0 0 440px", height: "380px", borderRadius: "8px", backgroundColor: "#F9FAFB", backgroundImage: "url('/media__1775348197260.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                   <div style={{ flex: "1 1 477px", height: "380px", borderRadius: "8px", backgroundColor: "#F9FAFB", backgroundImage: "url('/media__1775348198184.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                   <div style={{ flex: "1 1 610px", height: "380px", borderRadius: "8px", backgroundColor: "#F9FAFB", backgroundImage: "url('/media__1775348198209.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                   <div style={{ flex: "0 0 307px", height: "380px", borderRadius: "8px", backgroundColor: "#F9FAFB", backgroundImage: "url('/media__1775348198227.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                </div>
             </div>

             {/* Right Sidebar */}
             <div style={{ flex: "1 1 300px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "40px" }}>
                <div style={{ border: "1px solid #D2D1D4", borderRadius: "8px", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                   <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0B111D", textTransform: "uppercase", margin: 0 }}>TABLE OF CONTENTS</h3>
                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px", fontSize: "18px", color: "var(--primary-color)" }}>
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
                
                {/* Social Share Grouping exactly matching array */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                   <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#0B111D", margin: 0 }}>Share on</h4>
                   <div style={{ display: "flex", gap: "18px" }}>
                      <div style={{ width: "36px", height: "36px", backgroundColor: "#1877F2", borderRadius: "4px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>f</div>
                      <div style={{ width: "36px", height: "36px", backgroundColor: "#0A66C2", borderRadius: "4px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>in</div>
                      <div style={{ width: "36px", height: "36px", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", borderRadius: "4px", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>IG</div>
                      <div style={{ width: "36px", height: "36px", backgroundColor: "#0B111D", borderRadius: "4px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>X</div>
                      <div style={{ width: "36px", height: "36px", backgroundColor: "#25D366", borderRadius: "4px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>W</div>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* Lotto Embedded Banner */}
       <section style={{ backgroundColor: "var(--primary-color)", padding: "75px 0", marginTop: "50px" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2.75px solid white" }}>🎟️</div>
              <div>
                 <h2 style={{ fontSize: "18px", fontWeight: "700", color: "white", margin: "0 0 -2px 0" }}>Join Our Weekly Lotto</h2>
                 <p style={{ fontSize: "16px", color: "white", margin: 0 }}>Join our exciting fundraiser! Every punt counts.</p>
              </div>
           </div>
           <Link href="/fundraise/lotto" style={{ backgroundColor: "white", color: "var(--primary-color)", padding: "10px 24px", borderRadius: "4px", fontSize: "16px", fontWeight: "600" }}>Enter Now →</Link>
        </div>
      </section>
    </main>
  );
}
