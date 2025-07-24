import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/mysql-core";

export const AdminRole = t.mysqlEnum("admin_role", [
  "superadmin",
  "chq-admin",
  "mio",
]);

export const userTable = t.mysqlTable(
  "admin",
  {
    id: t
      .char("id", { length: 36 })
      .primaryKey()
      .default(sql`(UUID())`),
    fullName: t.varchar("full_name", { length: 150 }).notNull(),
    username: t.varchar("username", { length: 150 }).notNull(),
    password: t.varchar("password", { length: 100 }).notNull(),
    role: AdminRole.default("mio").notNull(),
    createdAt: t.timestamp("created_at").notNull().defaultNow(),
    updatedAt: t.timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => [t.uniqueIndex("username_idx").on(table.username)]
);


