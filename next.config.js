/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
  
  // Add this line
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;