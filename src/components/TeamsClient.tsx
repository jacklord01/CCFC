"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TeamsClientProps {
  initialMatches: any[];
  initialHasMore: boolean;
}

export default function TeamsClient({ initialMatches, initialHasMore }: TeamsClientProps) {
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "RESULT">("UPCOMING");
  const [matches, setMatches] = useState<any[]>(initialMatches);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  // When tab changes, reset and fetch from page 1
  useEffect(() => {
    // Skip first render since we have initialMatches for UPCOMING
    if (page === 1 && activeTab === "UPCOMING" && matches.length > 0) return;
    
    fetchMatches(1, activeTab, true);
  }, [activeTab]);

  const fetchMatches = async (pageNum: number, type: string, reset: boolean = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/matches?type=${type}&page=${pageNum}&limit=6`);
      const data = await res.json();
      
      if (reset) {
        setMatches(data.matches);
        setPage(1);
      } else {
        setMatches(prev => [...prev, ...data.matches]);
        setPage(pageNum);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to fetch matches", error);
    }
    setLoading(false);
  };

  const handleSeeMore = () => {
    fetchMatches(page + 1, activeTab);
  };

  return (
    <>
      {/* Toggles */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "60px" }}>
         <button 
           onClick={() => setActiveTab('UPCOMING')}
           style={{ 
             backgroundColor: activeTab === 'UPCOMING' ? "#008236" : "white", 
             color: activeTab === 'UPCOMING' ? "white" : "#111827", 
             padding: "16px 48px", borderRadius: "12px", border: "1px solid #EAEAEA", 
             fontWeight: "800", fontSize: "18px", cursor: "pointer", transition: "all 0.2s"
           }}
         >
           Upcoming Fixtures
         </button>
         <button 
           onClick={() => setActiveTab('RESULT')}
           style={{ 
             backgroundColor: activeTab === 'RESULT' ? "#008236" : "white", 
             color: activeTab === 'RESULT' ? "white" : "#111827", 
             padding: "16px 48px", borderRadius: "12px", border: "1px solid #EAEAEA", 
             fontWeight: "800", fontSize: "18px", cursor: "pointer", transition: "all 0.2s"
           }}
         >
           Recent Results
         </button>
      </div>

      {/* Matches Grid */}
      {loading && page === 1 && matches.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px", color: "#9CA3AF" }}>Synchronizing match data...</div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: "32px" }}>
            {matches.map((match) => (
              <div key={match.id} className="card card-flush" style={{ border: "1px solid #F3F4F6", transition: "transform 0.2s ease" }}>
                 <div style={{ 
                   backgroundColor: "#F9FAFB", padding: "14px", textAlign: "center", 
                   fontWeight: "900", fontSize: "14px", color: "#008236", 
                   textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #F3F4F6" 
                 }}>
                    {match.type === 'UPCOMING' ? 'Fixture' : 'Match Result'}
                 </div>
                 <div style={{ padding: "60px 40px", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "480px", margin: "0 auto" }}>
                       <div style={{ width: "140px" }}>
                         <div style={{ width: "96px", height: "96px", backgroundColor: "#F3F4F6", borderRadius: "50%", margin: "0 auto 16px auto", position: "relative", overflow: "hidden" }}>
                            <Image src="/CCFC-Logo.png" alt="Crest" fill style={{ objectFit: "contain", padding: "12px" }} />
                         </div>
                         <h4 style={{ fontSize: "18px", fontWeight: "800", color: "#111827", margin: 0 }}>{match.homeTeam}</h4>
                       </div>
                       
                       <div style={{ padding: "0 20px" }}>
                         {match.type === 'RESULT' ? (
                           <div style={{ fontSize: "48px", fontWeight: "900", color: "#111827", letterSpacing: "6px" }}>{match.score}</div>
                         ) : (
                           <div style={{ fontSize: "24px", fontWeight: "900", color: "#E5E7EB" }}>VS</div>
                         )}
                       </div>
                       
                       <div style={{ width: "140px" }}>
                         <div style={{ width: "96px", height: "96px", backgroundColor: "#F3F4F6", borderRadius: "50%", margin: "0 auto 16px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "40px" }}>⚽</span>
                         </div>
                         <h4 style={{ fontSize: "18px", fontWeight: "800", color: "#111827", margin: 0 }}>{match.awayTeam}</h4>
                       </div>
                    </div>
                 </div>
                 <div style={{ borderTop: "1px solid #F3F4F6", padding: "20px 30px", display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: "14px", fontWeight: "600" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📅 {new Date(match.date).toLocaleDateString("en-IE", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>📍 {match.location}</div>
                 </div>
              </div>
            ))}
          </div>
          
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
               <button 
                 onClick={handleSeeMore}
                 disabled={loading}
                 style={{ 
                   padding: "16px 60px", backgroundColor: "#008236", color: "white", 
                   borderRadius: "12px", border: "none", fontWeight: "800", 
                   fontSize: "18px", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,130,54,0.15)",
                   transition: "all 0.2s"
                 }}
               >
                 {loading ? "Synchronizing..." : "See More Match Data"}
               </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
