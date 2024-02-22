const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // swapped out for deployment as static assets.
  output: 'export',
  distDir: 'dist',
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: false
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/chat',
  //       permanent: true
  //     }
  //   ]
  // }
}

module.exports = nextConfig
