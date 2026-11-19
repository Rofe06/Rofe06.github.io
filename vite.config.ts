import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Site utilisateur GitHub Pages (rofe06.github.io) : servi à la racine.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
