/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/MAS-multi-agent-architectures',
  assetPrefix: '/MAS-multi-agent-architectures/',
  
  // Add this line
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;