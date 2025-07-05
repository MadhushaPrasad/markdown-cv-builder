# 📄 Markdown CV Builder — v2.1

**Generate stylish resumes from Markdown with Vite, UnoCSS, and markdown-it!**  

Export as **PDF**, **PNG**, or **JPEG** — with live preview and hot reloading.

![Preview](https://github.com/user-attachments/assets/08342584-6f07-4cdb-ad46-3505de96a7dd)

---

## ✅ Summary: v1 vs v2 Comparison

| Feature              | v1 (Before)               | v2.1 (Now - Vite)                     |
| -------------------- | ------------------------  | ------------------------------------- |
| **Live Preview**     | `nodemon` + Express       | ✅ Vite Dev Server                    |
| **Hot Reload**       | ❌ Manual refresh         | ✅ Automatic via Vite                  |
| **Markdown Parsing** | `marked` (basic)          | ✅ `markdown-it` + `markdown-it-attrs`|
| **Theme Styling**    | Manual CSS                | ✅ UnoCSS utility-first styling       |
| **Frontend Build**   | None                      | ✅ Vite bundler                       |
| **Injection System** | Basic string replace      | ✅ Dynamic + revertible templates     |
| **Export Formats**   | Only PDF                  | ✅ PDF, PNG, JPEG                     |
| **Custom Classes**   | Not supported             | ✅ Tailwind-style in `.md`            |

---

## 🚀 Overview

`markdown-cv-builder` is a modern toolchain for converting Markdown resumes into responsive, beautifully styled web pages and documents.

* ✅ Powered by [Vite](https://vitejs.dev)  
* 🎨 Styled with [UnoCSS](https://unocss.dev) (Tailwind-compatible)  
* ✍️ Uses [markdown-it](https://github.com/markdown-it/markdown-it) for flexible parsing  
* 📄 Outputs PDF, PNG, or JPEG via [Puppeteer](https://pptr.dev)  
* ♻️ Auto-replaces theme content and restores templates  

---

## 🛠 Available Commands

| Command                     | Description                                   |
| --------------------------- | ----------------------------------------------|
| **`pnpm start`**            | Inject markdown and start dev preview.        |
| **`pnpm run dev`**          | Start Vite dev server only                    |
| **`pnpm run inject`**       | Inject resume into theme                      |
| **`pnpm run generate`**     | Generate a styled PDF                         |
| **`pnpm run image:png`**    | Export PNG of the resume                      |
| **`pnpm run image:jpeg`**   | Export JPEG of the resume.                    |
| **`pnpm run unocss:build`** | Manually build UnoCSS styles                  |

---

## 📦 Installation

```bash
pnpm install
# or
npm install
```

---

## 🌐 Preview in Browser (Live Dev Mode)

```bash
pnpm run inject
pnpm run dev
```

Or simply:

```bash
pnpm start
```

**Opens Vite dev server at [http://localhost:5173](http://localhost:5173).
Markdown changes reflect automatically with hot reload.**

---

## 💻 Usage

### 🖨️ Generate PDF Resume

```bash
pnpm run generate
```

Generates `resume.pdf` with UnoCSS-styled layout.

---

### 🖼️ Generate PNG or JPEG Image

```bash
pnpm run image:png
pnpm run image:jpeg
```

Creates `resume.png` or `resume.jpeg` with full-page rendering.

---

## 🧪 CLI Usage

```bash
node index.js <markdown-file> <theme> <output-file> [format] [--serve]
```

| Arg # | Description                                | Example      |
| ----- | ------------------------------------------ | ------------ |
| 1     | Markdown file path                         | `resume.md`  |
| 2     | Theme name (without `.html`)               | `index`      |
| 3     | Output file name (with extension)          | `resume.pdf` |
| 4     | Format: `pdf`, `png`, or `jpeg` (optional) | `png`        |
| Flag  | `--serve` — launches dev server            |              |

#### ✅ Examples

```bash
# Live preview with hot reload
node index.js resume.md index --serve

# PDF export
node index.js resume.md index resume.pdf pdf

# PNG export
node index.js resume.md index resume.png png

# JPEG export
node index.js resume.md index resume.jpeg jpeg
```

---

## 🔧 Scripts in `package.json`

```json
"scripts": {
  "unocss:build": "unocss './**/*.{html,md,vue,js,ts}' -o dist/unocss.css",
  "start": "npm run inject && vite",
  "dev": "vite",
  "build:theme": "vite build",
  "inject": "node index.js resume.md index --serve",
  "generate": "node index.js resume.md index resume.pdf",
  "image:png": "node index.js resume.md index resume.png png",
  "image:jpeg": "node index.js resume.md index resume.jpeg jpeg"
}
```

---

## 📝 Example `resume.md`

```markdown
# John Doe {.text-blue-700 .text-4xl .font-bold}

## 💼 Experience

### Software Engineer — TechCorp  
*2020 – Present*  
- Developed full-stack apps using React and Laravel

## 🎓 Education

**B.Sc. in Software Engineering**  
University of Example — 2016–2020

## 🛠️ Skills

- JavaScript
- Node.js
- Git & GitHub
```

You can add Tailwind/UnoCSS utility classes using `{}`:

```md
# My Name {.text-blue-700 .text-4xl .font-bold}
```

---

## 🎨 Themes

Themes are located in the `themes/` directory.

Each theme should have this placeholder:

```html
<div id="resume">
  {{content}}
</div>
```

After injecting, this is replaced with your rendered Markdown.

---

## 🌈 UnoCSS Support

UnoCSS is a fast, on-demand utility engine. You can use Tailwind-like classes directly:

```md
## Projects {.text-xl .mb-4 .text-gray-600}
```

UnoCSS scans:

* `themes/**/*.html`
* `resume.md`

🔧 Configured via `uno.config.js`.

---

## 📁 Project Structure

```
.
├── index.js
├── resume.md
├── README.md
├── themes/
│   └── index.html
├── commands/
│   ├── inject-markdown.js
│   ├── generate-pdf.js
│   └── generate-image.js
├── utils/
│   ├── helpers.js
│   └── template.js
├── uno.config.js
├── vite.config.js
```

---

## 🧠 How It Works

1. Renders Markdown to HTML via `markdown-it`.
2. Injects into your theme (replaces `{{content}}`).
3. UnoCSS builds styles from `.md` + `.html` usage.
4. Puppeteer renders as:

   * PDF (`page.pdf`)
   * PNG/JPEG (`page.screenshot`)
5. Restores original template after export.

---

## 🤝 Contributing

Contributions welcome! 🙌

You can help by:

* 🌟 Star this repo
* 📝 Create issues or pull requests
* 🐛 Report bugs or request features
* 🎨 Add themes - Enhancing UnoCSS templates
* 🧠 Improve performance, structure, or features
* 📚 Write documentation
* 🐛 Fix bugs

### 🌱 Contributors

<a href="https://github.com/MadhushaPrasad/markdown-cv-builder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MadhushaPrasad/markdown-cv-builder" />
</a>

---

## 📄 License

MIT © [Madhusha Prasad](https://github.com/MadhushaPrasad)

---

![Tag](https://img.shields.io/badge/-markdown-blue?style=flat-square) ![Tag](https://img.shields.io/badge/-resume-success?style=flat-square) ![Tag](https://img.shields.io/badge/-pdf--generator-red?style=flat-square) ![Tag](https://img.shields.io/badge/-puppeteer-yellow?style=flat-square) ![Tag](https://img.shields.io/badge/-vite-purple?style=flat-square) ![Tag](https://img.shields.io/badge/-unocss-9cf?style=flat-square) ![Tag](https://img.shields.io/badge/-tailwindcss-0ea5e9?style=flat-square) ![Tag](https://img.shields.io/badge/-developer--tools-222?style=flat-square)

*Built with ❤️ using Node.js, Vite, UnoCSS, and markdown-it*
