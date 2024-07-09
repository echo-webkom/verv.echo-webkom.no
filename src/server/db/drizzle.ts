import { drizzle } from "drizzle-orm/libsql";

import { libsql } from "./client";
import * as schema from "./schemas";

export const db = drizzle(libsql, {
  schema,
});
