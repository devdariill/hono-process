import { serveStatic } from 'hono/serve-static.module'
import { Hono } from 'hono'
import leadeboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
// export default {
//   async fetch (request, env, ctx) {
//     return new Response(JSON.stringify(leadeboard), {
//       headers: {
//         'content-type': 'application/json;charset=UTF-8'
//       }
//     })
//   }
// }
const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'leaderboard'
    },
    {
      endpoint: '/static/logos/1k.svg',
      description: 'static files'
    },
    {
      endpoint: '/teams',
      description: 'teams'
    }
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json([
    {
      endpoint: '/',
      description: 'home'
    },
    leadeboard
  ])
})
app.get('/teams', (ctx) => {
  return ctx.json([
    {
      endpoint: '/',
      description: 'home'
    },
    teams
  ])
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
