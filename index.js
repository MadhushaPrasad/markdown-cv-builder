import { injectMarkDown } from './commands/inject-markdown.js';
import { generatePDF } from './commands/generate-pdf.js';
import { generateImage } from './commands/generate-image.js';

function showHelp() {
  console.log(`
📄 Markdown CV Builder CLI

Usage:
  node index.js <markdown-file> <theme-name> <output-file> [format] [--serve]

Examples:
  node index.js resume.md index resume.pdf
  node index.js resume.md index resume.png png
  node index.js resume.md index --serve

Options:
  <markdown-file>    Path to your resume Markdown file (default: resume.md)
  <theme-name>       Theme HTML filename without extension (default: index)
  <output-file>      Output file name (e.g., resume.pdf, resume.png)
  <format>           Output format: pdf | png | jpeg (default: pdf)
  --serve            Inject markdown into theme and start Vite preview
  --help             Show this help message

📦 Tip:
  Run \`npm run dev\` or \`pnpm run dev\` to preview after using --serve
`);
}

// CLI Entry Point
if (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('markdown-cv-builder.js')) {
  const args = process.argv.slice(2);
  const inputPath = args[0] || 'resume.md';
  const theme = args[1] || 'index';
  const output = args[2] || 'resume.pdf';
  const format = args[3] || 'png' || 'jpeg'; // can be 'png', 'jpeg'
  const serve = args.includes('--serve');

  if (serve) {
    injectMarkDown(inputPath, theme)
    console.log('👉 Now run: npm run dev (or pnpm run dev) to start Vite dev server');
  } else if (output === 'resume.pdf') {
    generatePDF(inputPath, theme, output)
  } else if (format === 'png' || format === 'jpeg') {
    generateImage(inputPath, theme, format)
  } else {
    console.error(`❌ Unsupported format '${format}'. Use 'pdf', 'png', or 'jpeg'.`)
  }
}
