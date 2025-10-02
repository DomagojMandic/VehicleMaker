import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

/* No need for a manualChunks function */
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-and-redux-vendor': [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            '@reduxjs/toolkit',
            'react-redux',
          ],
          'ui-vendor': ['styled-components', 'react-hot-toast'],
          forms: ['react-hook-form'],
          'api-vendor': ['@supabase/supabase-js'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      '@supabase/supabase-js',
    ],
  },
});
