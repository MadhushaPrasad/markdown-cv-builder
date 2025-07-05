# Markdown CV Builder — v2

**Generate stylish, modern resumes from Markdown with Vite, UnoCSS, and markdown-it!**

![Resume](https://github.com/user-attachments/assets/08342584-6f07-4cdb-ad46-3505de96a7dd)

---

## ✅ Summary: v1 vs v2 Comparison

| Feature              | v1 (Before)              | v2 (Now - Vite)                   |
| -------------------- | ------------------------ | --------------------------------- |
| **Live Preview**     | `nodemon` + Express      | ✅ Vite Dev Server                 |
| **Hot Reload**       | ❌ Manual browser refresh | ✅ Automatic via Vite              |
| **Markdown Parser**  | `marked` (basic)         | ✅ `markdown-it` + attrs           |
| **Theme Styling**    | Manual CSS per theme     | ✅ UnoCSS utility-first            |
| **Frontend Build**   | None                     | ✅ Vite bundler                    |
| **Injection System** | Basic string replace     | ✅ Dynamic and revertible          |
| **Dev Experience**   | CLI + Express            | ✅ Integrated & streamlined        |
| **Custom Styling**   | Limited                  | ✅ Supports `.class{}` in Markdown |
| **PDF Export**       | Puppeteer                | ✅ Puppeteer                       |

---

## 🚀 Overview

`markdown-cv-builder` is a streamlined toolchain for converting your Markdown resume into a responsive, beautifully styled PDF or live-preview web app.

* ⚡ Powered by [Vite](https://vitejs.dev/) for blazing-fast frontend builds.
* 🎨 Styled using [UnoCSS](https://unocss.dev/) — instant utility classes.
* ✍️ Written in Markdown, rendered with [markdown-it](https://github.com/markdown-it/markdown-it).
* 📄 PDF generation via [Puppeteer](https://pptr.dev/).
* 🔁 Live preview with automatic injection and hot reload.

---

## 🆕 What's New in v2

- ✅ Replaced `marked` with `markdown-it` for better HTML and attribute support

- ✅ Integrated UnoCSS for utility-first styling

- ✅ Switched to Vite as frontend bundler and dev server

- ✅ Updated CLI: cleaner commands, default theme fallback, and file restoration

- ✅ Improved Dev Experience: No manual reloads — just write Markdown and preview instantly

---

## 📦 Installation

```bash
pnpm install
# or
npm install
```

### 🌐 Preview Resume in Browser

```bash
pnpm run inject
pnpm run dev
```

Or simply:

```bash
pnpm start
```

The resume will be injected into the `themes/index.html`, and Vite will serve it live on [http://localhost:5173](http://localhost:5173). Changes auto-refresh.

---

## 💻 Usage

### 🖨️ Generate PDF Resume

```bash
pnpm run generate
```

This builds a styled `resume.pdf` from your `resume.md` using Puppeteer.

---

## 📝 Example `resume.md`

```markdown
# Madhusha Prasad

## 💼 Experience

### Software Engineer – TechCorp  
*2020 – Present*  
- Developed scalable web apps using React and Node.js.

## 🎓 Education

**B.Sc. in Computer Science**  
University of Example – 2016–2020

## 🛠️ Skills

- JavaScript
- Laravel
- Vue.js
- Git & GitHub
```

You can add Tailwind-like utility classes using `{}`:

```markdown
# My Name {.text-blue-700 .text-4xl .font-bold}
```

---

## 🎨 Themes

Themes are located inside the `themes/` directory. The default is `index.html`.

A theme includes a placeholder for Markdown content:

```html
<div id="resume">
  {{content}}
</div>
```

It also includes a fallback welcome message when no content is injected.

---

## 🧪 CLI Options

```bash
node index.js <markdown-file> <theme-name> <output-file> [--serve]
```

| Argument          | Description                              | Default      |
| ----------------- | ---------------------------------------- | ------------ |
| `<markdown-file>` | Path to your Markdown CV                 | `resume.md`  |
| `<theme-name>`    | Name of the theme HTML file (no `.html`) | `index`      |
| `<output-file>`   | PDF filename to generate                 | `resume.pdf` |
| `--serve`         | Inject content and prepare dev preview   | Not enabled  |

---

## 🌈 UnoCSS Features

You can use all Tailwind-compatible utilities like:

* `text-lg`, `font-bold`, `mt-4`
* `text-blue-700`, `bg-gray-100`
* `grid`, `flex`, `rounded`, etc.

---

## 🤝 Contributing

Contributions are welcome! Create issues, suggest features, or send PRs. Add new themes, refine CLI logic, or improve styles with UnoCSS.

---

## 🌱 Contributors </br>

<a href="https://github.com/MadhushaPrasad/markdown-cv-builder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MadhushaPrasad/markdown-cv-builder" />
</a>

---

## 📄 License

MIT © [Madhusha Prasad](https://github.com/MadhushaPrasad)

---

*Built with ❤️ using Node.js, Vite, UnoCSS, and markdown-it*
