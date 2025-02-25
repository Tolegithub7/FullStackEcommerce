import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  // schema: './src/db/schema.ts',
  schema: ['./src/db/productsSchema.ts', './src/db/usersSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
