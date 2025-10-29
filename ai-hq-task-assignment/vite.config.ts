
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'figma:asset/9cef46bd713e70c2b130d32f10e2dc0e01cbffbd.png': path.resolve(__dirname, './src/assets/9cef46bd713e70c2b130d32f10e2dc0e01cbffbd.png'),
        'figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png': path.resolve(__dirname, './src/assets/95d7a9441ece29d0959b696f896ad7aa18c44dda.png'),
        'figma:asset/8f8739691b761475875d05de592ee9166a999b67.png': path.resolve(__dirname, './src/assets/8f8739691b761475875d05de592ee9166a999b67.png'),
        'figma:asset/4afc0e5a544bfde91b9b95c54aae40d325105d17.png': path.resolve(__dirname, './src/assets/4afc0e5a544bfde91b9b95c54aae40d325105d17.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });