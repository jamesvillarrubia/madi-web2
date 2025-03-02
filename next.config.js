/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // swapped out for deployment as static assets.
  // output: 'export',
  // distDir: 'dist',
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/'
      }
    ]
  }
}

module.exports = nextConfig
