import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import type {
  createUserInputsTypes,
  updateUserInputTypes,
  usersQueryInputTypes,
} from "@/schemas/user";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";

const getMulti = async (queries: usersQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const filters = [];

  // base query and base count query
  const query = db.select().from(userTable);

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(userTable);

  // add search
  if (queries.search) {
    filters.push(like(userTable.fullName, `%${queries.search}%`));
  }

  if (filters.length > 0) {
    query.where(and(...filters));
    countQuery.where(and(...filters));
  }

  // adding pagination
  query.limit(size).offset(size * (page - 1));

  // sorting
  if (sort === "asc") {
    query.orderBy(asc(userTable.createdAt));
  } else {
    query.orderBy(desc(userTable.createdAt));
  }

  const [data, [{ count }]] = await Promise.all([query, countQuery]);

  return { data, count };
};

const getSingle = async (id: string) => {
  const data = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .limit(1);

  return data;
};

const getSingleByUsername = async (username: string) => {
  const data = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1);

  return data;
};

const createNew = async (info: createUserInputsTypes) => {
  const data = await db.insert(userTable).values({
    fullName: info.fullName,
    password: info.password,
    role: info.role,
    username: info.username,
  });

  return data;
};

const updateOne = async (id: string, info: updateUserInputTypes) => {
  const data = await db
    .update(userTable)
    .set({
      ...info,
    })
    .where(eq(userTable.id, id));

  return data;
};

const deleteOne = async (id: string) => {
  const data = await db.delete(userTable).where(eq(userTable.id, id));
  return data;
};

export const userLib = {
  getMulti,
  getSingle,
  getSingleByUsername,
  createNew,
  updateOne,
  deleteOne,
};
