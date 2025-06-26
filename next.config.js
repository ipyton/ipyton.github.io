/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 添加末尾斜杠，避免 GitHub Pages 路由问题
  trailingSlash: true,
  
  // 禁用图片优化，因为静态导出不支持
  images: {
    unoptimized: true
  },
  
  // 如果你的仓库不是在根域名下，需要设置 basePath
  // 例如：https://username.github.io/repository-name
  // basePath: '/repository-name',
  
  // 设置资源前缀，与 basePath 保持一致
  // assetPrefix: '/repository-name',
  
  // 禁用 ESLint 在构建时运行（可选）
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  // 禁用 TypeScript 类型检查在构建时运行（可选）
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
}

module.exports = nextConfig