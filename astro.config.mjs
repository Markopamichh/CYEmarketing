import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// REEMPLAZAR: dominio real cuando esté definido (afecta sitemap, OG y canonical)
export default defineConfig({
  site: 'https://cyestudio.com.ar',
  output: 'static',
  integrations: [tailwind(), sitemap()],
});
