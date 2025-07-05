import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import { exec } from 'child_process'
import { promisify } from 'util'
import {TEMPLATE_CONTENT} from './utils/template.js'

const execAsync = promisify(exec)

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const THEMES_DIR = path.join(__dirname, 'themes')
const INDEX_PATH = path.join(THEMES_DIR, 'index.html')


export async function buildCV({ inputPath, theme = 'index', output = 'resume.pdf', serve = false }) {
  console.log('📄 Running markdown-cv-builder...')
  try {
    // Read Markdown
    const markdown = fs.readFileSync(inputPath, 'utf-8')

    // Parse Markdown using markdown-it with attrs
    const md = new MarkdownIt({ html: true }).use(markdownItAttrs)
    const htmlContent = md.render(markdown)

    // Read Theme Template
    let themePath = path.join(THEMES_DIR, `${theme}.html`)
    if (!fs.existsSync(themePath)) {
      console.warn(`⚠️ Theme '${theme}' not found. Falling back to default theme`)
      themePath = path.join(THEMES_DIR, `index.html`)
    }

    const template = fs.readFileSync(themePath, 'utf-8')
    const injectedPath = path.join(THEMES_DIR, 'index.html')

    // Serve
    if (serve) {
      // Restore template first to avoid multiple injections
      fs.writeFileSync(INDEX_PATH, TEMPLATE_CONTENT)

      // Read again to inject into the fresh base
      const freshTemplate = fs.readFileSync(INDEX_PATH, 'utf-8')

      // Inject the rendered markdown
      const injectedHTML = freshTemplate.replace('{{content}}', htmlContent)
      fs.writeFileSync(INDEX_PATH, injectedHTML)

      console.log('⚡ Injected markdown into index.html')
      console.log('👉 Now run: npm run dev (or pnpm run dev) to start Vite dev server')
    } else {

      console.log('🚧 Building UnoCSS styles...')
      // Run the unocss build command (adjust if your package manager is npm or yarn)
      await execAsync("pnpm run unocss:build")


      // Read the generated CSS
      const cssPath = path.resolve(__dirname, 'dist/unocss.css')
      let css = ''
      if (fs.existsSync(cssPath)) {
        css = fs.readFileSync(cssPath, 'utf-8')
      }

      // Remove existing CSS link tags from template (if any)
      const cleanTemplate = template.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/g, '')

      // Inject inline CSS before </head>
      const finalHtml = cleanTemplate.replace(
        '</head>',
        `<style>${css}</style></head>`
      ).replace('{{content}}', htmlContent);


      // Generate PDF
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setContent(finalHtml, { waitUntil: 'networkidle0' })
      await page.pdf({ path: output, format: 'A4' })
      await browser.close()

      // ✅ Restore index.html to template after generating
      fs.writeFileSync(INDEX_PATH, TEMPLATE_CONTENT)

      console.log(`✅ PDF generated: ${output}`)
      console.log('♻️ Restored default template')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// CLI Entry Point
if (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('markdown-cv-builder.js')) {
  const args = process.argv.slice(2)
  const inputPath = args[0] || 'resume.md'
  const theme = args[1] || 'index'
  const output = args[2] || 'resume.pdf'
  const serve = args.includes('--serve')

  buildCV({ inputPath, theme, output, serve })
}
