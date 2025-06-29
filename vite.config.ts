import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// ✅ THÊM phần build và server nếu chưa có
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9000,
  },
  build: {
    outDir: 'dist',
  },
  // 👇 Đây là phần quan trọng khi host SPA
  base: '/',
})
