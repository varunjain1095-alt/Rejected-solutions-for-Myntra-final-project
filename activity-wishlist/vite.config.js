import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(root, '../app/public'),
  resolve: {
    alias: {
      '@app': path.resolve(root, '../app/src'),
    },
  },
  server: {
    port: 5174,
    fs: { allow: [path.resolve(root, '..')] },
  },
});
