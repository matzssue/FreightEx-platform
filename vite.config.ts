/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
