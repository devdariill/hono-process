import { serveStatic } from 'hono/serve-static.module'
import { Hono } from 'hono'
import leadeboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'
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
    },
    {
      endpoint: '/presidents',
      description: 'presidents'
    },
    {
      endpoint: '/presidents/iker-casillas',
      description: 'president*'
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
app.get('/presidents', (ctx) => {
  return ctx.json([
    {
      endpoint: '/',
      description: 'home'
    },
    presidents
  ])
})
app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const president = presidents.find(president => president.id === id)
  return president
    ? ctx.json([
      {
        endpoint: '/',
        description: 'home'
      },
      president
    ])
    : ctx.json({ message: 'Not found' }, 404)
})
app.get('/static/*', serveStatic({ root: './' }))

export default app
