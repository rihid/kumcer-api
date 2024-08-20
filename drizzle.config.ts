import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts" ,
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    port: Number(process.env.POSTGRES_PORT || '5432'),
  },
});