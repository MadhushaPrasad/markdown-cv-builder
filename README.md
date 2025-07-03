# Markdown CV Builder

**Generate stylish, modern resumes from simple Markdown files!**

---

## 🚀 Overview

`markdown-cv-builder` is a lightweight Node.js tool that converts your Markdown-formatted resume into a beautifully styled PDF or serves it as an interactive HTML preview.

- Write your CV in Markdown — simple, readable, and easy to update.
- Choose from customizable HTML themes.
- Export to PDF using Puppeteer.
- Preview live in the browser with a built-in Express server.

---

## ⚙️ Features

- Convert Markdown to semantic HTML using [marked](https://github.com/markedjs/marked)
- Render themes with customizable styles (`themes/` folder)
- Generate PDF resumes using [Puppeteer](https://pptr.dev/)
- Preview your resume locally with hot-reloading (via Express server)
- Easy CLI usage for quick building and previewing

---

## 📦 Installation

```bash
npm install
```

Make sure dependencies like `marked`, `puppeteer`, and `express` are installed.

---

Certainly! Here's the **updated Usage section** reflecting your `package.json` scripts (`generate`, `serve`, and `dev`):

---

## 💻 Usage

### Generate PDF

```bash
npm run generate
```

This runs:

```bash
node markdown-cv-builder.js resume.md modern resume.pdf
```

---

### Preview in Browser

```bash
npm run serve
```

Then open [http://localhost:3000](http://localhost:3000) to see your resume live.

---

### Development Mode (Auto-reload on changes)

```bash
npm run dev
```

This command runs the server with `nodemon`, watching for changes in `resume.md` and files inside the `themes/` folder (`.md` and `.html` extensions). The preview server will automatically restart on changes, helping your development workflow.

---

## 📝 Markdown Resume Example (`resume.md`)

# Madhusha Prasad

## Experience

### Software Engineer – TechCorp

- 2020 – Present
- Developed scalable web applications.

## Education

**B.Sc. in Computer Science**  
University of Example – 2016–2020

## Skills

- JavaScript
- React
- Node.js

---

## 🎨 Themes

Themes are HTML templates located in the `themes/` folder. The default is `modern.html` but you can add your own by following the pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Resume</title>
  <style>
    /* Your styles here */
  </style>
</head>
<body>
  {{content}}
</body>
</html>
```

---

## 🔧 Configuration

You can pass CLI arguments:

```bash
node markdown-cv-builder.js <markdown-file> <theme-name> <output-file> [--serve]
```

| Argument          | Description                               | Default      |
| ----------------- | ----------------------------------------- | ------------ |
| `<markdown-file>` | Path to your Markdown CV                  | `resume.md`  |
| `<theme-name>`    | Theme template filename (without `.html`) | `modern`     |
| `<output-file>`   | Output PDF filename                       | `resume.pdf` |
| `--serve`         | Launch local preview server               | Off          |

---

## 🤝 Contributing

Feel free to submit issues or pull requests! You can add new themes, improve parsing, or enhance the CLI experience.

---

## 📄 License

This package is licensed under the  MIT License - see the [LICENSE](https://github.com/MadhushaPrasad/markdown-cv-builder/blob/main/LICENSE) file for details.

---

*Built with ❤️ and Node.js*
