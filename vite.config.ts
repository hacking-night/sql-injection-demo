import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/sql-injection-demo/',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
