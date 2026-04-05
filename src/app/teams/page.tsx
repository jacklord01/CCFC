"use client";

import { useState } from "react";
import Image from "next/image";

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("fixtures");

  const matches = [
    { id: 1, type: "UPCOMING", home: "Castlebar Celtic FC", away: "Ballina Town FC", score: "3 : 6", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" },
    { id: 2, type: "UPCOMING", home: "Claremorris FC", away: "Castlebar Celtic FC", score: "4 : 8", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" },
    { id: 3, type: "UPCOMING", home: "Castlebar Celtic FC", away: "Westport United", score: "6 : 2", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" },
    { id: 4, type: "UPCOMING", home: "Belmullet FC", away: "Castlebar Celtic FC", score: "5 : 1", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" },
    { id: 5, type: "UPCOMING", home: "Castlebar Celtic FC", away: "Achill Rovers", score: "7 : 4", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" },
    { id: 6, type: "UPCOMING", home: "Knock United", away: "Castlebar Celtic FC", score: "8 : 1", date: "Saturday, March 15, 2025 at 3:00 PM", location: "Celtic Park, Castlebar" }
  ];

  return (
    <main>
      {/* Dark Hero Banner matching Figma */}
      <section style={{ backgroundColor: "var(--footer-bg)", color: "white", textAlign: "center", padding: "6rem 1rem", backgroundImage: "radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 70%)" }}>
         <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "white" }}>Castlebar Celtic FC Matches</h1>
         <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>Find fixtures and results for Castlebar Celtic FC Matches on the official website</p>
      </section>

      <section className="section-white">
        <div className="container">
          
          {/* Toggles */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
             <button 
               onClick={() => setActiveTab('fixtures')}
               style={{ 
                 backgroundColor: activeTab === 'fixtures' ? "var(--footer-bg)" : "white", 
                 color: activeTab === 'fixtures' ? "white" : "var(--text-main)", 
                 padding: "0.75rem 2rem", border: "1px solid var(--border-color)", fontWeight: "600" 
               }}
             >
               Fixtures
             </button>
             <button 
               onClick={() => setActiveTab('results')}
               style={{ 
                 backgroundColor: activeTab === 'results' ? "var(--footer-bg)" : "white", 
                 color: activeTab === 'results' ? "white" : "var(--text-main)", 
                 padding: "0.75rem 2rem", border: "1px solid var(--border-color)", fontWeight: "600" 
               }}
             >
               Results
             </button>
          </div>

          {/* Matches Grid */}
          <div className="grid-cols-2">
            {matches.map((match) => (
              <div key={match.id} className="card card-flush">
                 <div className="card-header-green" style={{ textAlign: "center", borderBottom: "none" }}>{match.type}</div>
                 <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                       <div style={{ textAlign: "center", width: "120px" }}>
                         <div style={{ width: "70px", height: "70px", backgroundColor: "var(--background-muted)", borderRadius: "50%", margin: "0 auto 1rem auto" }}></div>
                         <h4 style={{ fontSize: "0.85rem" }}>{match.home}</h4>
                       </div>
                       
                       {activeTab === 'results' ? (
                         <span style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-main)", whiteSpace: "nowrap" }}>{match.score}</span>
                       ) : (
                         <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "rgba(11,17,29,0.3)" }}>VS</span>
                       )}
                       
                       <div style={{ textAlign: "center", width: "120px" }}>
                         <div style={{ width: "70px", height: "70px", backgroundColor: "var(--background-muted)", borderRadius: "50%", margin: "0 auto 1rem auto" }}></div>
                         <h4 style={{ fontSize: "0.85rem" }}>{match.away}</h4>
                       </div>
                    </div>
                 </div>
                 <div style={{ borderTop: "1px solid var(--border-color)", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.8rem", backgroundColor: "var(--background-muted)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>📅 {match.date}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>📍 {match.location}</div>
                 </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
             <button className="btn-primary" style={{ padding: "0.75rem 3rem" }}>See More</button>
          </div>

        </div>
      </section>
    </main>
  );
}
