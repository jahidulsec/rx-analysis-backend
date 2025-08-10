import { db } from "@/db/db";
import {
  doctorTable,
  surveyMedicineTable,
  surveyTable,
  territoryTable,
  userTable,
} from "@/db/schema";
import type {
  createSurveyInputsTypes,
  updateSurveyInputTypes,
  surveysQueryInputTypes,
} from "@/schemas/survey";
import { and, asc, between, count, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: surveysQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // Main query with joins
  const query = db
    .selectDistinct({
      id: surveyTable.id,
      doctorId: doctorTable.id,
      doctorName: doctorTable.fullName,
      doctorMobile: doctorTable.mobile,
      territoryId: territoryTable.sapTerritoryId,
      territoryName: territoryTable.territory,
      createdBy: userTable.username,
      surveyorName: userTable.fullName,
      createdAt: surveyTable.createdAt,
    })
    .from(surveyTable)
    .innerJoin(doctorTable, eq(surveyTable.doctorId, doctorTable.id))
    .innerJoin(
      territoryTable,
      eq(territoryTable.sapTerritoryId, doctorTable.territoryId)
    )
    .innerJoin(userTable, eq(userTable.id, surveyTable.createdBy));

  // Count query
  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(surveyTable)
    .innerJoin(doctorTable, eq(surveyTable.doctorId, doctorTable.id))
    .innerJoin(userTable, eq(userTable.id, surveyTable.createdBy));

  // Search filter
  if (queries.search) {
    filters.push(
      or(
        like(doctorTable.fullName, `%${queries.search}%`),
        like(doctorTable.mobile, `%${queries.search}%`),
        like(userTable.fullName, `%${queries.search}%`),
        like(userTable.username, `%${queries.search}%`)
      )
    );
  }

  if (queries.createdBy) {
    filters.push(eq(surveyTable.createdBy, queries.createdBy));
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
    query.orderBy(asc(surveyTable.createdAt));
  } else {
    query.orderBy(desc(surveyTable.createdAt));
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
    .select({
      id: surveyTable.id,
      doctorId: doctorTable.id,
      doctorName: doctorTable.fullName,
      doctorMobile: doctorTable.mobile,
      territoryId: territoryTable.sapTerritoryId,
      territoryName: territoryTable.territory,
      createdBy: userTable.username,
      surveyorName: userTable.fullName,
      createdAt: surveyTable.createdAt,
    })
    .from(surveyTable)
    .where(eq(surveyTable.id, id))
    .innerJoin(doctorTable, eq(surveyTable.doctorId, doctorTable.id))
    .innerJoin(
      territoryTable,
      eq(territoryTable.sapTerritoryId, doctorTable.territoryId)
    )
    .innerJoin(userTable, eq(userTable.id, surveyTable.createdBy))
    .limit(1);

  return data;
};

const createNew = async (info: createSurveyInputsTypes) => {
  const surveyId = crypto.randomUUID();

  // create survey
  await db.insert(surveyTable).values({
    id: surveyId,
    doctorId: info.doctorId,
    createdBy: info.createdBy as string,
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
