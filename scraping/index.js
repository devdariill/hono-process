import * as cheerio from 'cheerio'
const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}
async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}
const cleanText = (text) => text.replace(/\t|\n|\s:/g, '').replace(/.*:/g, ' ')
async function getLeaderBoard () {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')
  $rows.each((i, el) => {
    const $el = $(el)
    const rawTeam = $el.find('.fs-table-text_3').text()
    const rawVictories = $el.find('.fs-table-text_4').text()
    const rawDefeats = $el.find('.fs-table-text_5').text()
    const rawGoalsScored = $el.find('.fs-table-text_6').text()
    const rawGoalsAgainst = $el.find('.fs-table-text_7').text()
    const rawYellowCards = $el.find('.fs-table-text_8').text()
    const rawRedCards = $el.find('.fs-table-text_9').text()
    console.log(
      cleanText(rawTeam),
      cleanText(rawVictories),
      cleanText(rawDefeats),
      cleanText(rawGoalsScored),
      cleanText(rawGoalsAgainst),
      cleanText(rawYellowCards),
      cleanText(rawRedCards)
    )
  })
}
getLeaderBoard()
