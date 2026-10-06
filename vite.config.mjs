import { defineConfig, loadEnv, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

const transformJsxInJs = {
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.replace(/\\/g, '/').match(/\/src\/.*\.js$/)) return null
    return transformWithOxc(code, id, { lang: 'jsx' })
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [transformJsxInJs, react()],
    define: {
      'process.env.REACT_APP_API_RAILWAY': JSON.stringify(env.REACT_APP_API_RAILWAY)
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true
    },
    optimizeDeps: {
      entries: ['index.html'],
      rolldownOptions: {
        moduleTypes: {
          '.js': 'jsx'
        }
      }
    },
    test: {
      environment: 'node',
      globals: true,
      fileParallelism: false,
      maxWorkers: 1,
      minWorkers: 1
    }
  }
})
