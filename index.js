import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const THEMES_DIR = path.join(__dirname, 'themes')

export async function buildCV({ inputPath, theme = 'index', output = 'resume.pdf', serve = false }) {
  console.log('📄 Running markdown-cv-builder...')
  try {
    const markdown = fs.readFileSync(inputPath, 'utf-8')
    const htmlContent = marked.parse(markdown)

    const themePath = path.join(THEMES_DIR, `${theme}.html`)
    if (!fs.existsSync(themePath)) throw new Error(`Theme '${theme}' not found in ${THEMES_DIR}`)

    const template = fs.readFileSync(themePath, 'utf-8')
    const injectedPath = path.join(THEMES_DIR, 'injected.html')

    if (serve) {
      // Inject the rendered markdown into the injected.html file for Vite dev server
      fs.writeFileSync(injectedPath, template.replace('{{content}}', htmlContent))
      console.log('⚡ Injected markdown into injected.html')
      console.log('👉 Now run: npm run dev (or pnpm run dev) to start Vite dev server')
    } else {
      // Generate PDF directly
      const finalHtml = template.replace('{{content}}', htmlContent)
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
