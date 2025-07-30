import { db } from "@/db/db";
import { doctorTable } from "@/db/schema";
import type {
  createDoctorInputsTypes,
  updateDoctorInputTypes,
  doctorsQueryInputTypes,
} from "@/schemas/doctor";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: doctorsQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // base query and base count query
  const query = db.select().from(doctorTable);

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(doctorTable);

  // add search
  if (queries.search) {
    filters.push(
      or(
        like(doctorTable.fullName, `%${queries.search}%`),
        like(doctorTable.mobile, `%${queries.search}%`)
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
    query.orderBy(asc(doctorTable.createdAt));
  } else {
    query.orderBy(desc(doctorTable.createdAt));
  }

  const [data, [{ count }]] = await Promise.all([query, countQuery]);

  return { data, count };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(doctorTable)
    .where(eq(doctorTable.id, id))
    .limit(1);

  return data;
};

const createNew = async (info: createDoctorInputsTypes) => {
  const data = await db.insert(doctorTable).values({
    ...info,
  });

  return data;
};

const updateOne = async (id: string, info: updateDoctorInputTypes) => {
  const data = await db
    .update(doctorTable)
    .set({
      ...info,
    })
    .where(eq(doctorTable.id, id));

  return data;
};

const deleteOne = async (id: string) => {
  const data = await db.delete(doctorTable).where(eq(doctorTable.id, id));
  return data;
};

const getSingleDoctorPermission = async (id: string) => {
  const data = await getSingle(id);
  if (data.length === 0) return undefined;
  return data[0];
};

export const doctorLib = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
  getSingleDoctorPermission,
};
