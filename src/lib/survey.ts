import { db } from "@/db/db";
import {
  doctorTable,
  surveyMedicineTable,
  surveyTable,
  userTable,
} from "@/db/schema";
import type {
  createSurveyInputsTypes,
  updateSurveyInputTypes,
  surveysQueryInputTypes,
} from "@/schemas/survey";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: surveysQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // base query and base count query
  const query = db
    .select()
    .from(surveyTable)
    .innerJoin(doctorTable, eq(surveyTable.doctorId, doctorTable.id))
    .innerJoin(userTable, eq(userTable.id, surveyTable.createdBy));

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(surveyTable);

  // add search
  if (queries.search) {
    filters.push(
      or(
        like(doctorTable.fullName, `%${queries.search}%`),
        like(userTable.fullName, `%${queries.search}%`)
      )
    );
  }

  if (filters.length > 0) {
    query.where(and(...filters));
    countQuery.where(and(...filters));
  }

  // adding pagination
  query.limit(size).offset(size * (page - 1));

  // sorting
  if (sort === "asc") {
    query.orderBy(asc(surveyTable.createdAt));
  } else {
    query.orderBy(desc(surveyTable.createdAt));
  }

  const [data, [{ count }]] = await Promise.all([query, countQuery]);

  return { data, count };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(surveyTable)
    .where(eq(surveyTable.id, id))
    .limit(1);

  return data;
};

const createNew = async (info: createSurveyInputsTypes) => {
  const surveyId = crypto.randomUUID();

  // create survey
  await db.insert(surveyTable).values({
    id: surveyId,
    doctorId: info.doctorId,
    createdBy: info.createdBy,
  });

  // //  create suvey medicine list
  for (let i = 0; i < info.medicines.length; i++) {
    await db.insert(surveyMedicineTable).values({
      medicineId: info.medicines[i].id,
      quantity: info.medicines[i].quantity,
      surveyId: surveyId,
    });
  }

  return surveyId;
};

// const updateOne = async (id: string, info: updatesurveyInputTypes) => {
//   const data = await db
//     .update(surveyTable)
//     .set({
//       ...info,
//     })
//     .where(eq(surveyTable.id, id));

//   return data;
// };

const deleteOne = async (id: string) => {
  const data = await db.delete(surveyTable).where(eq(surveyTable.id, id));
  return data;
};

export const surveyLib = {
  getMulti,
  getSingle,
  createNew,
  // updateOne,
  deleteOne,
};
