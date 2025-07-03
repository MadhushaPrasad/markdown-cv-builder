import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const THEMES_DIR = path.join(__dirname, 'themes')

export async function buildCV({ inputPath, theme = 'modern', output = 'resume.pdf', serve = false }) {
  console.log('📄 Running markdown-cv-builder...')
  try {
    const markdown = fs.readFileSync(inputPath, 'utf-8')
    const htmlContent = marked.parse(markdown)

    const themePath = path.join(THEMES_DIR, `${theme}.html`)
    if (!fs.existsSync(themePath)) throw new Error(`Theme '${theme}' not found in ${THEMES_DIR}`)

    const template = fs.readFileSync(themePath, 'utf-8')
    const finalHtml = template.replace('{{content}}', htmlContent)

    if (serve) {
      const app = express()
      app.get('/', (_, res) => res.send(finalHtml))
      const port = 3000
      app.listen(port, () => console.log(`🚀 Preview: http://localhost:${port}`))
    } else {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setContent(finalHtml, { waitUntil: 'networkidle0' })
      await page.pdf({ path: output, format: 'A4' })
      await browser.close()
      console.log(`✅ PDF generated: ${output}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// CLI usage
if (process.argv[1].endsWith('markdown-cv-builder.js')) {
  const args = process.argv.slice(2)
  const inputPath = args[0] || 'resume.md'
  const theme = args[1] || 'modern'
  const output = args[2] || 'resume.pdf'
  const serve = args.includes('--serve')

  buildCV({ inputPath, theme, output, serve })
}
