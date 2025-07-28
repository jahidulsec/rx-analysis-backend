import { notFoundError } from "@/lib/errors";
import { territoryLib } from "@/lib/territory";
import type { Context } from "hono";

const deleteOne = async (c: Context) => {
  // get params
  const { id } = c.req.param();

  // get territory
  const territory = await territoryLib.getSingle(id);

  if (territory.length === 0) {
    notFoundError("territory does not exist");
  }

  //  create user
  await territoryLib.deleteOne(id);

  const responseData = {
    success: true,
    message: "User deleted successfully!",
    data: territory,
  };

  //send success response
  return c.json(responseData);
};

export { deleteOne as deleteTerritory };
