import path from 'path';
import { injectMarkDown } from '../commands/inject-markdown.js';

export default function injectResumePlugin({ resumeFile = 'resume.md', theme = 'index' } = {}) {
  const resumePath = path.resolve(resumeFile);

  return {
    name: 'vite-plugin-inject-resume',

    configureServer(server) {
      const inject = () => injectMarkDown(resumeFile, theme);

      // Watch for resume file changes
      server.watcher.add(resumePath);
      server.watcher.on('change', (file) => {
        if (file === resumePath) {
          inject()
        }
      });

      // Inject initially
      inject();
    },
  }
}
