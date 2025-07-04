import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'

const THEMES_DIR = path.join(process.cwd(), 'themes')
const INDEX_PATH = path.join(THEMES_DIR, 'index.html')

// Base template to reset to before each injection
const TEMPLATE_CONTENT = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Resume</title>
  </head>
  <body class="mx-auto p-8 max-w-screen-md font-sans text-gray-800">
    <div id="resume">
      {{content}}
    </div>

    <script type="module">
      const container = document.getElementById('resume')
      if (container.innerHTML.includes('{{content}}')) {
        container.innerHTML = \`
          <h1 class="text-3xl font-bold mb-4 text-blue-700">Welcome to Markdown CV Builder</h1>
          <p class="text-lg text-gray-600">No content has been injected yet.</p>
          <p class="mt-2 text-gray-500">To get started, run:</p>
          <pre class="bg-gray-100 p-4 rounded mt-2 text-sm"><code>pnpm run inject</code></pre>
          <p class="mt-4 text-gray-500"> The page will automatically refresh once your resume is injected — no need to reload manually.</p>
        \`
      }
    </script>

    <script type="module" src="./main.js"></script>
  </body>
</html>
`;

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
