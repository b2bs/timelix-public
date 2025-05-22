import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Carrega el .env segons el mode (normalment 'production')
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Això injecta les variables VITE_... al frontend
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});

