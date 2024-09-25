import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(async configEnv => {
  const config = await (typeof viteConfig === 'function' ? viteConfig(configEnv) : viteConfig)

  return mergeConfig(config, {
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
})
