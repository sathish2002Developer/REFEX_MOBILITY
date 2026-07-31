import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { getLandingPageMetaByPath, injectMetaIntoHtml } = require(
  path.join(__dirname, '../server/helpers/landingPageMeta.js')
)

function isDocumentRequest(req) {
  if (req.method !== 'GET') return false
  const url = req.url?.split('?')[0] || ''
  if (!url || url.startsWith('/@') || url.startsWith('/src') || url.startsWith('/node_modules')) {
    return false
  }
  if (/\.[a-zA-Z0-9]+($|\?)/.test(url)) return false
  return true
}

export function landingMetaPlugin() {
  return {
    name: 'landing-page-meta',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!isDocumentRequest(req)) return next()

        const pathname = req.url?.split('?')[0] || ''
        const meta = getLandingPageMetaByPath(pathname)
        if (!meta?.pageTitle) return next()

        try {
          const indexPath = path.join(__dirname, 'index.html')
          let html = fs.readFileSync(indexPath, 'utf-8')
          html = await server.transformIndexHtml(pathname, html)
          html = injectMetaIntoHtml(html, meta)
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(html)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}
