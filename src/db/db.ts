import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

export const db = drizzle(process.env.DATABASE_URL!);
export const pool = createPool(process.env.DATABASE_URL!);
