import { notFoundError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import type { Context } from "hono";

const deleteOne = async (c: Context) => {
  // get params
  const { id } = c.req.param();

  // get user
  const user = await userLib.getSingle(id);

  if (user.length === 0) {
    notFoundError("User does not exist");
  }

  //  create user
  await userLib.deleteOne(id);

  const responseData = {
    success: true,
    message: "User deleted successfully!",
    data: user,
  };

  //send success response
  return c.json(responseData);
};

export { deleteOne as deleteUser };
