import { db } from "@/db/db";
import { territoryTable } from "@/db/schema";
import type {
  createTerritoryInputsTypes,
  updateTerritoryInputTypes,
  territorysQueryInputTypes,
} from "@/schemas/territory";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";

const getMulti = async (queries: territorysQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // base query and base count query
  const query = db.select().from(territoryTable);

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(territoryTable);

  // add search
  if (queries.search) {
    filters.push(
      or(
        like(territoryTable.sapTerritoryId, `%${queries.search}%`),
        like(territoryTable.zone, `%${queries.search}%`),
        like(territoryTable.territory, `%${queries.search}%`)
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
    query.orderBy(asc(territoryTable.createdAt));
  } else {
    query.orderBy(desc(territoryTable.createdAt));
  }

  const [data, [{ count }]] = await Promise.all([query, countQuery]);

  return { data, count };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(territoryTable)
    .where(eq(territoryTable.sapTerritoryId, id))
    .limit(1);

  return data;
};

const createNew = async (info: createTerritoryInputsTypes) => {
  const data = await db.insert(territoryTable).values({
    ...info,
  });

  return data;
};

const updateOne = async (id: string, info: updateTerritoryInputTypes) => {
  const data = await db
    .update(territoryTable)
    .set({
      ...info,
    })
    .where(eq(territoryTable.sapTerritoryId, id));

  return data;
};

const deleteOne = async (id: string) => {
  const data = await db
    .delete(territoryTable)
    .where(eq(territoryTable.sapTerritoryId, id));
  return data;
};

export const territoryLib = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
};
