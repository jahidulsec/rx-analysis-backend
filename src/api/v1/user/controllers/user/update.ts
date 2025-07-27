import { badRequestError, notFoundError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { updateUserDTOSchema } from "@/schemas/user";
import { hashPassword } from "@/utils/password";
import type { Context } from "hono";

const update = async (c: Context) => {
  //  get form data
  const formData = await c.req.json();

  // get params
  const { id } = c.req.param();

  // validated data
  const validatedData = updateUserDTOSchema.parse(formData);

  // hash password
  if (validatedData.password) {
    validatedData.password = await hashPassword(validatedData.password);
  }

  // get user
  const user = await userLib.getSingle(id);

  if (user.length === 0) {
    notFoundError("User does not exist");
  }

  //  create user
  await userLib.updateOne(id, validatedData);

  const responseData = {
    success: true,
    message: "User updated successfully!",
    data: validatedData,
  };

  //send success response
  return c.json(responseData);
};

export { update as updateUser };
