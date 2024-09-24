// TypeScripe声明文件，用于为环境变量提供类型定义
/// <reference types="vite/client" />

// 为importMetaEnv接口添加自定义环境变量的类型定义
interface importMetaEnv {
  // 声明VITE_API_BASE_URL为只读字符串
  readonly VITE_API_BASE_URL: string
}

// 扩展importMeta接口，包含env属性
interface ImportMeta {
  // env属性的类型为importMetaEnv
  readonly env: ImportMetaEnv
}
