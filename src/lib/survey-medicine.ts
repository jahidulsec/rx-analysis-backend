import { db } from "@/db/db";
import { medicineTable, surveyMedicineTable } from "@/db/schema";
import type {
  createSurveyMedicineInputsTypes,
  updateSurveyMedicineInputTypes,
  surveysMedicineQueryInputTypes,
} from "@/schemas/survey-medicine";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: surveysMedicineQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // Main query with joins
  const query = db
    .selectDistinct({
      id: surveyMedicineTable.id,
      surveyId: surveyMedicineTable.surveyId,
      medicineId: surveyMedicineTable.medicineId,
      medicineName: medicineTable.name,
      quantity: surveyMedicineTable.quantity,
      type: medicineTable.type,
      createdAt: surveyMedicineTable.createdAt,
    })
    .from(surveyMedicineTable)
    .innerJoin(
      medicineTable,
      eq(surveyMedicineTable.medicineId, medicineTable.id)
    );

  // Count query
  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(surveyMedicineTable)
    .innerJoin(
      medicineTable,
      eq(surveyMedicineTable.medicineId, medicineTable.id)
    );

  // Search filter
  if (queries.search) {
    filters.push(
      or(
        like(medicineTable.name, `%${queries.search}%`),
        like(surveyMedicineTable.surveyId, `${queries.search}%`)
      )
    );
  }

  // Apply filters
  if (filters.length > 0) {
    query.where(and(...filters));
    countQuery.where(and(...filters));
  }

  // Pagination
  query.limit(size).offset(size * (page - 1));

  // Sorting
  if (sort === "asc") {
    query.orderBy(asc(surveyMedicineTable.createdAt));
  } else {
    query.orderBy(desc(surveyMedicineTable.createdAt));
  }

  // Execute queries
  const [rawData, [{ count }]] = await Promise.all([query, countQuery]);

  return {
    data: rawData,
    count,
  };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(surveyMedicineTable)
    .where(eq(surveyMedicineTable.id, id))
    .limit(1);

  return data;
};

const createNew = async (info: createSurveyMedicineInputsTypes) => {
  // create survey
  const data = await db.insert(surveyMedicineTable).values({
    ...info,
  });

  return data;
};

const updateOne = async (id: string, info: updateSurveyMedicineInputTypes) => {
  const data = await db
    .update(surveyMedicineTable)
    .set({
      ...info,
    })
    .where(eq(surveyMedicineTable.id, id));

  return data;
};

const deleteOne = async (id: string) => {
  const data = await db
    .delete(surveyMedicineTable)
    .where(eq(surveyMedicineTable.id, id));
  return data;
};

export const surveyMedicineLib = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
};
