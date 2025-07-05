import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import {TEMPLATE_CONTENT} from '../utils/template'

const THEMES_DIR = path.join(process.cwd(), 'themes')
const INDEX_PATH = path.join(THEMES_DIR, 'index.html')

export default function injectResumePlugin() {
  const md = new MarkdownIt({ html: true }).use(markdownItAttrs)
  const resumePath = path.resolve('resume.md')

  return {
    name: 'vite-plugin-inject-resume',

    configureServer(server) {
      const inject = () => {
        const markdown = fs.readFileSync(resumePath, 'utf-8')
        const rendered = md.render(markdown)

        // Reset index.html to original base before injecting
        fs.writeFileSync(INDEX_PATH, TEMPLATE_CONTENT)

        const freshTemplate = fs.readFileSync(INDEX_PATH, 'utf-8')
        const injectedHtml = freshTemplate.replace('{{content}}', rendered)
        fs.writeFileSync(INDEX_PATH, injectedHtml)

        console.log('💡 resume.md injected into index.html')
      }

      server.watcher.add(resumePath)
      server.watcher.on('change', (file) => {
        if (file === resumePath) {
          inject()
        }
      })

      // Initial inject on server start
      inject()
    },
  }
}
