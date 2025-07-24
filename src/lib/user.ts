import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import type { usersQueryInputTypes } from "@/schemas/user";

const getMulti = async () => {
  const data = await db.select().from(userTable);

  return data;
};


export const userLib = {
    getMulti
}