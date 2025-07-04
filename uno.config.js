import { defineConfig,presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetWind3(),
    // ...custom presets
  ],
  include: ['./themes/**/*.html', './resume.md'],
  rules: [
    // your custom rules
  ],
})
