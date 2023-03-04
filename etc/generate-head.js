import favicons from 'favicons'
import fs from 'fs/promises'
import { EOL } from 'os'

const dist = './public/meta/'
const { files, images, html } = await favicons('./etc/foxpro.png', {
   path: '/meta',
   appName: 'foxpro.su',
   appShortName: 'foxpro blog',
   appDescription: 'foxpro personal blog',
})

await fs.mkdir(dist, { recursive: true })
await Promise.all([...files, ...images].map((image) => fs.writeFile(dist + image.name, image.contents)))
await fs.writeFile('./pages/renderer/head.html', html.join(EOL))
