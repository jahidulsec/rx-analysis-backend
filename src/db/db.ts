import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema  from "./schema";

export const pool = createPool(process.env.DATABASE_URL!);
export const db = drizzle(pool, { schema: schema, mode: "default", logger: true });
