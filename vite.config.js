import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Adjust the path if necessary
    },
  },
  build: {
    rollupOptions: {
      input: './src/App.tsx',
    },
  },
});