import * as t from "drizzle-orm/mysql-core";
import { createdAt, id, updatedAt } from "./helper";

export const AdminRole = t.mysqlEnum("admin_role", [
  "superadmin",
  "chq-admin",
  "mio",
]);

export const userTable = t.mysqlTable(
  "user",
  {
    id: id,
    fullName: t.varchar("full_name", { length: 150 }).notNull(),
    username: t.varchar("username", { length: 150 }).notNull(),
    password: t.varchar("password", { length: 100 }).notNull(),
    role: AdminRole.default("mio").notNull(),
    createdAt: createdAt,
    updatedAt: updatedAt,
  },
  (table) => [t.uniqueIndex("username_idx").on(table.username)]
);

export const territoryTable = t.mysqlTable("territory", {
  sapTerritoryId: t
    .varchar("sap_territory_id", { length: 10 })
    .primaryKey()
    .notNull(),
  zone: t.varchar("zone", { length: 50 }).notNull(),
  region: t.varchar("region", { length: 100 }).notNull(),
  territory: t.varchar("territory", { length: 100 }).notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const doctorTable = t.mysqlTable("doctor", {
  id: id,
  fullName: t.varchar("full_name", { length: 150 }).notNull(),
  designation: t.varchar("designation", { length: 50 }).notNull(),
  mobile: t.varchar("mobile", { length: 20 }).notNull(),
  territoryId: t
    .varchar("territory_id", { length: 10 })
    .notNull()
    .references(() => territoryTable.sapTerritoryId, { onDelete: "restrict" }),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const MedicineType = t.mysqlEnum("type", ["radiant", "competitor"]);

export const medicineTable = t.mysqlTable("medicine", {
  id: id,
  name: t.varchar("name", { length: 255 }).notNull(),
  type: MedicineType.notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const surveyTable = t.mysqlTable("survey", {
  id: id,
  doctorId: t
    .varchar("doctor_id", { length: 36 })
    .notNull()
    .references(() => doctorTable.id, { onDelete: "restrict" }),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const surveyMedicineTable = t.mysqlTable("survey_medicine", {
  id: id,
  surveyId: t
    .varchar("survey_id", { length: 36 })
    .notNull()
    .references(() => surveyTable.id, { onDelete: "cascade" }),
  medicineId: t
    .varchar("medicine_id", { length: 36 })
    .notNull()
    .references(() => medicineTable.id, { onDelete: "restrict" }),
  createdAt: createdAt,
  updatedAt: updatedAt,
});
