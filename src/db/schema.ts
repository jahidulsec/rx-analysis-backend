import * as t from "drizzle-orm/mysql-core";
import { createdAt, id, updatedAt } from "./helper";
import { relations } from "drizzle-orm";

export const AdminRoles = ["superadmin", "chq-admin", "mio"] as const;

export type AdminRole = (typeof AdminRoles)[number];

export const AdminRole = t.mysqlEnum("admin_role", AdminRoles);

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
  createdBy: t
    .varchar("created_by", { length: 36 })
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }),
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
  quantity: t.int().notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const doctorRelations = relations(doctorTable, ({ one, many }) => ({
  territory: one(territoryTable, {
    fields: [doctorTable.territoryId],
    references: [territoryTable.sapTerritoryId],
  }),
  surveys: many(surveyTable),
}));

export const territoryRelations = relations(territoryTable, ({ many }) => ({
  doctors: many(doctorTable),
}));

export const surveyRelations = relations(surveyTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [surveyTable.createdBy],
    references: [userTable.id],
  }),
  doctor: one(doctorTable, {
    fields: [surveyTable.doctorId],
    references: [doctorTable.id],
  }),
  surveyMedicines: many(surveyMedicineTable),
}));

export const userRelations = relations(userTable, ({ many }) => ({
  surveys: many(surveyTable),
}));

export const surveyMedicineRelations = relations(
  surveyMedicineTable,
  ({ one }) => ({
    medicine: one(medicineTable, {
      fields: [surveyMedicineTable.medicineId],
      references: [medicineTable.id],
    }),
    survey: one(surveyTable, {
      fields: [surveyMedicineTable.surveyId],
      references: [surveyTable.id],
    }),
  })
);

export const medicineRelations = relations(medicineTable, ({ many }) => ({
  surveyMedicines: many(surveyMedicineTable),
}));


export type User = typeof userTable.$inferSelect