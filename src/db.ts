import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

export const connection = postgres(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${
    POSTGRES_HOST || "0.0.0.0"
  }:${POSTGRES_PORT}/${POSTGRES_DB}`
);

export const db = drizzle(connection, { schema });