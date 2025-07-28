import { db } from "@/db/db";
import { medicineTable } from "@/db/schema";
import type {
  createMedicineInputsTypes,
  updateMedicineInputTypes,
  medicinesQueryInputTypes,
} from "@/schemas/medicine";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: medicinesQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // base query and base count query
  const query = db.select().from(medicineTable);

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(medicineTable);

  // add search
  if (queries.search) {
    filters.push(like(medicineTable.name, `%${queries.search}%`));
  }

  if (filters.length > 0) {
    query.where(and(...filters));
    countQuery.where(and(...filters));
  }

  // adding pagination
  query.limit(size).offset(size * (page - 1));

  // sorting
  if (sort === "asc") {
    query.orderBy(asc(medicineTable.createdAt));
  } else {
    query.orderBy(desc(medicineTable.createdAt));
  }

  const [data, [{ count }]] = await Promise.all([query, countQuery]);

  return { data, count };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(medicineTable)
    .where(eq(medicineTable.id, id))
    .limit(1);

  return data;
};

const createNew = async (info: createMedicineInputsTypes) => {
  const data = await db.insert(medicineTable).values({
    ...info,
  });

  return data;
};

const updateOne = async (id: string, info: updateMedicineInputTypes) => {
  const data = await db
    .update(medicineTable)
    .set({
      ...info,
    })
    .where(eq(medicineTable.id, id));

  return data;
};

const deleteOne = async (id: string) => {
  const data = await db.delete(medicineTable).where(eq(medicineTable.id, id));
  return data;
};

export const medicineLib = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
};
