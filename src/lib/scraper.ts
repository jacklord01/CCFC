import * as cheerio from "cheerio";

export async function scrapeFinalWhistleMatches() {
  const url = "https://www.finalwhistle.ie/soccer/team/castlebar-celtic/";
  
  try {
    const response = await fetch(url, { 
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`FinalWhistle fetch failed: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const matches: any[] = [];
    const clubName = "Castlebar Celtic";

    // Helper to clean date text (e.g. "Sunday 4th May 2025")
    const cleanDate = (text: string) => {
      // Remove ordinals like "st", "nd", "rd", "th"
      const cleaned = text.replace(/(\d+)(st|nd|rd|th)/, "$1");
      return new Date(cleaned);
    };

    // Selector for SportPress result cards (.sp-template-event-list contains matches)
    $(".sp-event-list-item").each((_, element) => {
      const dateText = $(element).find(".sp-event-date a").text().trim(); // e.g. "28 March 2026"
      const title = $(element).find(".sp-event-title a").text().trim(); // e.g. "Castlebar Celtic v Westport United FC"
      const resultsText = $(element).find(".sp-event-results").text().trim(); // e.g. "1 - 0"
      
      if (!title || !dateText) return;

      const dateObj = cleanDate(dateText);
      if (isNaN(dateObj.getTime())) return; // Skip invalid dates

      const teams = title.split(" v ");
      if (teams.length < 2) return;
      const homeTeam = teams[0].trim();
      const awayTeam = teams[1].trim();
      
      // Determine match type
      const isResult = resultsText.includes("-");
      const type = isResult ? "RESULT" : "UPCOMING";

      matches.push({
        homeTeam,
        awayTeam,
        score: isResult ? resultsText : null,
        date: dateObj,
        location: "Celtic Park",
        type
      });
    });

    // Strategy for Tables (Alternative layout often used in sidebars)
    $("table.sp-event-list tr").each((_, element) => {
       const dateText = $(element).find("td.data-date a").text().trim();
       const homeTeam = $(element).find("td.data-home a").text().trim();
       const awayTeam = $(element).find("td.data-away a").text().trim();
       const timeOrScore = $(element).find("td.data-time a").text().trim();
       
       if (!homeTeam || !awayTeam) return;

       const isResult = timeOrScore.includes("-");
       
       matches.push({
         homeTeam,
         awayTeam,
         score: isResult ? timeOrScore : null,
         date: new Date(dateText),
         location: "TBC",
         type: isResult ? "RESULT" : "UPCOMING"
       });
    });

    return matches;
  } catch (error) {
    console.error("Scraper Error:", error);
    throw error;
  }
}
