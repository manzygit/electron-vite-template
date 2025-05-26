import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function getHtmlInputEntries(dir: string): Record<string, string> {
    const files = fs.readdirSync(dir);
    const entries: Record<string, string> = {};

    for (const file of files) {
        if (file.endsWith('.html')) {
            const name = path.parse(file).name;
            entries[name] = path.resolve(dir, file);
        }
    }

    return entries;
}

const renderDir = path.join(__dirname, './src/render');
const outDir = path.join(__dirname, './dist/render');

export default defineConfig({
    root: renderDir,
    base: "./",
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: getHtmlInputEntries(renderDir),
            output: {
                format: "commonjs",
            },
            external: ['electron']
        },
    },
    server: {
        port: 5123,
        strictPort: true
    }
});
