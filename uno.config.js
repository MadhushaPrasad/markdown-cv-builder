import { defineConfig, presetWind4,presetAttributify,presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind4(),
    presetAttributify(),
  ],
})
