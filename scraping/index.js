import * as cheerio from 'cheerio'
const res = await fetch('https://kingsleague.pro/estadisticas/clasificacion/')
const text = await res.text()
const $ = cheerio.load(text)
const table = $('table tbody tr').each((i,el)=>{console.log( $(el).text())}) // This is the problem