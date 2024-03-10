import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	// Enable Svelte to support Svelte components.
	integrations: [svelte()],
	vite: {
		envDir: '../../',
	},
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
});
