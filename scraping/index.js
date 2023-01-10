// import TEAMS from '../db/teams.json' assert { type: 'json' }
import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
const DB_PATH = path.join(process.cwd(), './db/')
const TEAMS = await readFile(`${DB_PATH}/teams.json`, 'utf-8')
const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}
async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}
async function getLeaderBoard () {
  const leaderboard = [] // let leaderboard = []
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')
  const LEADERBOARD_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    wins: { selector: '.fs-table-text_4', typeOf: 'number' },
    loses: { selector: '.fs-table-text_5', typeOf: 'number' },
    goalsScored: { selector: '.fs-table-text_6', typeOf: 'number' },
    goalsAgainst: { selector: '.fs-table-text_7', typeOf: 'number' },
    yellowCards: { selector: '.fs-table-text_8', typeOf: 'number' },
    redCards: { selector: '.fs-table-text_9', typeOf: 'number' }
  }
  const getTeamFrom = ({ name }) => TEAMS.find(team => team.name === name)
  const cleanText = text => text.replace(/\t|\n|\s:/g, '').replace(/.*:/g, ' ').trim()
  const leaderboardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)
  // $rows => each - elemnto de "cheerio" forEach != elemento.cheerio
  $rows.each((_, elemento) => {
    const leaderBoardEntries = leaderboardSelectorEntries.map(([key, { selector, typeOf }]) => {
      const rawValue = $(elemento).find(selector).text()
      const cleanValue = cleanText(rawValue)
      // const value = Number.isNaN(Number(cleanValue)) ? cleanValue : Number(cleanValue)
      // const value = key === 'team' ? cleanValue : Number(cleanValue)
      const value = typeOf === 'number' ? Number(cleanValue) : cleanValue
      return [key, value]
    })
    const { team: teamName, ...leaderboardForTeam } = Object.fromEntries(leaderBoardEntries)
    const team = getTeamFrom({ name: teamName })
    leaderboard.push(Object.fromEntries(leaderboardForTeam, team))
  })
  return leaderboard
}
const leaderborad = await getLeaderBoard()
console.log(leaderborad)
await writeFile(`${DB_PATH}/leaderboard.json`, JSON.stringify(leaderborad, null, 2), 'utf-8')
