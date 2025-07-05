import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import { execAsync } from '../utils/helpers.js';
import { TEMPLATE_CONTENT } from '../utils/template.js';

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const THEMES_DIR = path.join(process.cwd(), 'themes');
const INDEX_PATH = path.join(THEMES_DIR, 'index.html');

export async function generatePDF(inputPath = 'resume.md', theme = 'index', output = 'resume.pdf') {

  const resumePath = path.resolve(inputPath);
  const themePath = path.join(THEMES_DIR, `${theme}.html`);
  const templateExists = fs.existsSync(themePath);
  const resumeExists = fs.existsSync(resumePath);

  // check if resume inputPath exists
  if (!resumeExists) {
    console.error(`⚠️ Resume file '${resumePath}' not found. Please check the path provided.`);
    return;
  }

  const markdown = fs.readFileSync(resumePath, 'utf8');
  const md = new MarkdownIt({ html: true }).use(markdownItAttrs);
  const htmlContent = md.render(markdown);

  // Use theme if exists, otherwise fallback to template
  let freshTemplate = fs.readFileSync(themePath, 'utf-8');
  if (!templateExists) {
    console.warn(`⚠️ Theme '${theme}' not found. Falling back to default theme`);
    themePath = path.join(THEMES_DIR, 'index.html');
    freshTemplate = fs.readFileSync(themePath, 'utf-8');
  }

  // Run the unocss build command
  console.log('🚧 Building UnoCSS styles...');
  await execAsync('unocss "./themes/**/*.{html,js}" "./resume.md" --config uno.config.js -o dist/unocss.css');

  // Read the generated CSS
  const cssPath = path.resolve(__dirname, '../dist/unocss.css');
  let css = '';
  if (fs.existsSync(cssPath)) {
    css = fs.readFileSync(cssPath, 'utf-8');
  }

  // Remove existing CSS link tags from template (if any)
  const cleanTemplate = freshTemplate.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/g, '');

  // Inject inline CSS before </head>
  const finalHtml = cleanTemplate.replace(
    '</head>',
    `<style>${css}</style></head>`
  ).replace('{{content}}', htmlContent);

  // Generate PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: 'networkidle0' });
  await page.pdf({ path: output, format: 'A4' });
  await browser.close();

  // ✅ Restore index.html to template after generating
  fs.writeFileSync(INDEX_PATH, TEMPLATE_CONTENT);

  console.log(`✅ PDF generated: ${output}`);
  console.log('♻️ Restored default template');
}

