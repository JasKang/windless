import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'windless',
      formats: ['es'],
    },
    rollupOptions: {
      // 外部化所有依赖，等于 key 或者以 key/ 开头的都是外部依赖
      external: (Object.keys(pkg.dependencies || {}) as Array<string | RegExp>).concat(
        Object.keys(pkg.dependencies || {}).map(key => new RegExp(`^${key}/`))
      ),
    },
  },
})
