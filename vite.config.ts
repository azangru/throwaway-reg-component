import * as url from 'url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname, 'src/ens-regulation.ts'),
      name: 'ens-regulation',
      fileName: 'ens-regulation',
      formats: ['es']
    },
  },
  plugins: [dts({
    root: dirname
  })],
});
