import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL as string;

const client = new Client({
  connectionString,
});

client.connect();

export const db = drizzle(client, { schema });
