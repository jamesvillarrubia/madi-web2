/** AUTO-SUMMARY **
   Purpose: This file configures Tailwind CSS for the project, setting up theming, dark mode, and content paths.

   Key Components:
   - `config`: A constant of type `Config` from 'tailwindcss' that holds the configuration settings.
   - `theme`: Defines custom theming options, particularly for background images.
   - `plugins`: Specifies PostCSS and Tailwind CSS plugins used in the project.

   Functional Overview: The file sets up Tailwind CSS to support dark mode, specifies the files that Tailwind should apply its styles to, extends the default theme with custom background gradients, and includes necessary plugins for enhanced styling capabilities.

   Dependencies and Integrations: Depends on Tailwind CSS, PostCSS, and specific plugins like `postcss-import` and `@tailwindcss/typography`. It integrates with the project's styling pipeline, affecting how styles are applied across different components and pages.

   Additional Context: The configuration is tailored to support a variety of content file types (JavaScript, TypeScript, JSX, TSX, MDX) across different directories (pages, components, app), ensuring comprehensive styling coverage. The use of plugins enhances the typographic capabilities and import functionalities within the project's CSS framework.
*** END-SUMMARY **/
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  daisyui: {},
  plugins: [require('postcss-import'), require('@tailwindcss/typography')]
}
export default config
