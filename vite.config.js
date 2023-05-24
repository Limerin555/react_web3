import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: env.VITE_APP_PORT,
    },
    resolve: {
      alias: {
        '@sass': fileURLToPath(new URL('./src/sass', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url))
      }
    }
  }
});
