import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/display-pages/', // GitHub 仓库名，部署时资源路径前缀
})
