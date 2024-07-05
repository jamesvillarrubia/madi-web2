/** AUTO-SUMMARY **
   Purpose: This file configures settings for a Next.js application.

   Key Components:
   - `output`: Configuration for the output format of the build.
   - `distDir`: Specifies the directory where the build files will be placed.
   - `sassOptions`: Contains SASS configuration options.
   - `reactStrictMode`: Boolean setting for React's strict mode.

   Functional Overview: The file sets up various configurations for the Next.js project, such as build output, distribution directory, SASS options, and React strict mode settings.

   Dependencies and Integrations: This configuration file is integral to the Next.js framework setup and affects how the application is built and run.

   Additional Context: Some settings like `output` and `redirects` are commented out, indicating they might be toggled or changed based on the deployment environment or development needs.
*** END-SUMMARY **/

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
