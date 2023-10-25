import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from '@vitejs/plugin-rewrite-all'

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],});