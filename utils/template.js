export const TEMPLATE_CONTENT = `
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
