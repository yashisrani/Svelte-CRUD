import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    'process.env.POSTGRES_URL': JSON.stringify(process.env.POSTGRES_URL)
  }
});
