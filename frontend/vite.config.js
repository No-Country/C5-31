import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, './src/styles'),
            '@components': path.resolve(__dirname, './src/components'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@img': path.resolve(__dirname, './src/assets/images'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
    plugins: [react()],
});
