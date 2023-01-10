import * as cheerio from 'cheerio'
const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}
async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}
async function getLeaderBoard () {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')
  const LEADERBOARD_SELECTORS = {
    team: '.fs-table-text_3',
    victories: '.fs-table-text_4',
    loses: '.fs-table-text_5',
    goalsScored: '.fs-table-text_6',
    goalsAgainst: '.fs-table-text_7',
    yellowCards: '.fs-table-text_8',
    redCards: '.fs-table-text_9'
  }
  const cleanText = text => text.replace(/\t|\n|\s:/g, '').replace(/.*:/g, ' ')
  const leaderboardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)
  // $rows => each - elemnto de "cheerio" forEach != elemento.cheerio
  $rows.each((i, elemento) => {
    const leaderBoardEntries = leaderboardSelectorEntries.map(([key, selector]) => {
      const rawValue = $(elemento).find(selector).text()
      const value = cleanText(rawValue)
      return [key, value]
    })
    console.log(Object.fromEntries(leaderBoardEntries))
  })
}
getLeaderBoard()
