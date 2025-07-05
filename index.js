import { injectMarkDown } from './commands/inject-markdown.js';
import { generatePDF } from './commands/generate-pdf.js';

// CLI Entry Point
if (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('markdown-cv-builder.js')) {
  const args = process.argv.slice(2);
  const inputPath = args[0] || 'resume.md';
  const theme = args[1] || 'index';
  const output = args[2] || 'resume.pdf';
  const serve = args.includes('--serve');

  if (serve) {
    injectMarkDown(inputPath, theme)
    console.log('👉 Now run: npm run dev (or pnpm run dev) to start Vite dev server');
  }else{
    generatePDF(inputPath, theme, output);
  }
}
