import { defineConfig, presetAttributify, presetWind3 } from 'unocss';

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */ }),
    presetWind3(),
    // ...custom presets
  ],
  content: {
    pipeline: {
      include: [/\.html$/, /\.js$/, /\.md$/],
    },
  },
  rules: [
    // your custom rules
  ],
})
