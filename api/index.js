import { serveStatic } from 'hono/serve-static.module'
import { Hono } from 'hono'
import leadeboard from '../db/leaderboard.json'
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

app.get('/static/*', serveStatic({ root: './' }))

export default app
