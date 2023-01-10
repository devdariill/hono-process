import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
// import { logInfo, logSuccess } from './log'
const STATICS_PATH = path.join(process.cwd(), './assets/static/presidents')
const DB_PATH = path.join(process.cwd(), './db/')
const RAW_PRESIDENTS = await readFile(`${DB_PATH}/raw-presidents.json`, 'utf-8').then(JSON.parse)

const presidents = await Promise.all(
  RAW_PRESIDENTS.map(async (presidentInfo) => {
    const { slug: id, title, _links: links } = presidentInfo
    const { rendered: name } = title

    const { 'wp:attachment': attachment } = links
    const { href: imageApiEndpoint } = attachment[0]

    console.log(`> Fetching attachment for president: ${name}`)

    const responseImageEndpoint = await fetch(imageApiEndpoint)
    const data = await responseImageEndpoint.json()
    const [imageInfo] = data
    const {
      guid: { rendered: imageUrl }
    } = imageInfo

    const fileExtension = imageUrl.split('.').at(-1)

    console.log(`> Fetching image for president: ${name}`)

    const responseImage = await fetch(imageUrl)
    // Devuelve los bits del aricho
    const arrayBuffer = await responseImage.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log(`> Writing image to disk ${name}`)
    const imageFileName = `${id}.${fileExtension}`
    await writeFile(`${STATICS_PATH}/${imageFileName}`, buffer)

    console.log(`> Everything is done! ${name}`)
    return { id, name, image: imageFileName, teamId: 0 }
  })
)
await writeFile(`${DB_PATH}/presidents.json`, JSON.stringify(presidents, null, 2))
console.log('> All presidents are done!')
