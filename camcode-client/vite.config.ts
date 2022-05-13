import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    https: true,
    port: 3000,
  },
});
