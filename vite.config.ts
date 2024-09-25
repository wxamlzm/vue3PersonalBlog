import { fileURLToPath, URL } from 'node:url'

// 从vite包中导入defineConfig和loadEnv函数
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
// 导入vue3插件
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 使用defineConfig来配置vite
// 这个函数接收一个配置对象或一个返回配置对象的函数
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  console.log(mode)

  // loadEnv函数用于加载指定模式下的环境变量
  // 参数： 模式（如‘development'），环境文件所在目录，环境变量前缀（空字符串表示加载所有变量）
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), vueDevTools()],

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'axios', 'pinia', 'vue-router']
          }
        }
      }
    },

    server: {
      proxy: {
        '/api': {
          // 使用环境变量
          target: env.VITE_API_SERVER_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    // 配置路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
