import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import { TEMPLATE_CONTENT } from '../utils/template.js';

const THEMES_DIR = path.join(process.cwd(), 'themes');
const INDEX_PATH = path.join(THEMES_DIR, 'index.html');

export function injectMarkDown(inputPath = 'resume.md', theme = 'index') {

  const resumePath = path.resolve(inputPath);
  const themePath = path.join(THEMES_DIR, `${theme}.html`);
  const templateExists = fs.existsSync(themePath);
  const resumeExists = fs.existsSync(resumePath);

  // Restore template first to avoid multiple injections
  fs.writeFileSync(INDEX_PATH, TEMPLATE_CONTENT);

  // check if resume inputPath exists
  if (!resumeExists) {
    console.error(`⚠️ Resume file '${resumePath}' not found. Please check the path provided.`);
    return;
  }

  const markdown = fs.readFileSync(resumePath, 'utf8');
  const md = new MarkdownIt({ html: true }).use(markdownItAttrs);
  const htmlContent = md.render(markdown);

  // Use theme if exists, otherwise fallback to template
  if (!templateExists) {
    console.warn(`⚠️ Theme '${theme}' not found. Falling back to default theme`);
  } else {
    let freshTemplate = templateExists
      ? fs.readFileSync(themePath, 'utf8')
      : fs.readFileSync(INDEX_PATH, 'utf-8');

    const injectedHTML = freshTemplate.replace('{{content}}', htmlContent);
    fs.writeFileSync(INDEX_PATH, injectedHTML);

    console.log(`💡 Injected '${inputPath}' into theme '${theme}.html'`);
  }
}
