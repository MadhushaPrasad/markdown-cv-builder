import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import path from 'path'
import injectResumePlugin from './plugins/vite-plugin-inject-resume'

export default defineConfig({
  root: path.resolve(__dirname, 'themes'),
  plugins: [UnoCSS(), injectResumePlugin()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
