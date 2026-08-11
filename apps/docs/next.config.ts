import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@yiqi/ui'],
  images: { unoptimized: true },
}

export default nextConfig
