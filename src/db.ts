import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"

const { POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

export const connection = postgres('postgres://username:password@host:port/database', {
  host: 'localhost',
  port: 5445,
  database: POSTGRES_DATABASE,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
export const db = drizzle(connection, { schema });