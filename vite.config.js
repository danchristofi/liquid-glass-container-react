import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            // Entry point for your library
            entry: resolve(__dirname, 'src/index.jsx'),
            name: 'LiquidGlassContainerReact',
            // Generate multiple formats
            formats: ['es', 'umd'],
            fileName: (format) => `liquid-glass-container-react.${format}.js`
        },
        rollupOptions: {
            // Externalize React and React-DOM
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                // Global variables for UMD build
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'react/jsx-runtime'
                }
            }
        },
        // Generate source maps
        sourcemap: true,
        // Clear dist folder before build
        emptyOutDir: true
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    }
});