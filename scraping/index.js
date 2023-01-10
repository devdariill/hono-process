import * as cheerio from "cheerio";
const URLS = {
    leaderboard: "https://kingsleague.pro/estadisticas/clasificacion/",
}
async function scrape(url) {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
}
async function getLeaderBoard(){
    const $ = await scrape(URLS.leaderboard);
    $("table tbody tr").each((i, el) => {
        const rawTeam = $(el).find(".fs-table-text_3").text();
        const rawVictories = $(el).find(".fs-table-text_4").text();
        const rawDefeats = $(el).find(".fs-table-text_5").text();
        const rawGoalsScored = $(el).find(".fs-table-text_6").text();
        const rawGoalsAgainst = $(el).find(".fs-table-text_7").text();
  const rawYellowCards = $(el).find(".fs-table-text_8").text();
  const rawRedCards = $(el).find(".fs-table-text_9").text();
  console.log({
      rawTeam,
      rawVictories,
    });
});
}
getLeaderBoard();
const leaderboard = [
  {
    team: "Team 1",
    wins: 0,
    loses: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    cardsYellow: 0,
    cardsRed: 0,
  },
];
