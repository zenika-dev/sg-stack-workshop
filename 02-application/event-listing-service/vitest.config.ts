import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    fileParallelism: false,
    env: {
      EVENTS_DB: 'events.test.sqlite3',
    },
  },
  resolve: {
    alias: {
      // server-only throws outside Next's server bundle; neutralise it in tests
      'server-only': path.resolve(__dirname, './tests/stubs/server-only.ts'),
      '@': path.resolve(__dirname, './'),
    },
  },
});
