import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'themes'),
  plugins: [UnoCSS()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
