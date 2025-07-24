import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/mysql-core";

export const id = t
  .char("id", { length: 36 })
  .primaryKey()
  .default(sql`(UUID())`);

export const createdAt = t.timestamp("created_at").notNull().defaultNow();
export const updatedAt = t
  .timestamp("updated_at")
  .notNull()
  .defaultNow()
  .onUpdateNow();
