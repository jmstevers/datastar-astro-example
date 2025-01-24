import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: netlify(),
});