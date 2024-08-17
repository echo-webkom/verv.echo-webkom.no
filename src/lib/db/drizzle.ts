import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schemas";

const url = process.env.DATABASE_URL as string;
const authToken = process.env.DATABASE_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
