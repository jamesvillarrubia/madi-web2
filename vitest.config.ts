import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    environment: 'jsdom',
    includeSource: ['**/*.{js,ts,jsx,tsx}'], // Allow collocated tests
  },
//   define: { // TODO add this in production builds
//     'import.meta.vitest': 'undefined', 
//   },
})