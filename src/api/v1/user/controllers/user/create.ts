import { userLib } from "@/lib/user";
import { createUserDTOSchema } from "@/schemas/user";
import { hashPassword } from "@/utils/password";
import type { Context } from "hono";

const create = async (c: Context) => {
  //  get form data
  const formData = await c.req.json();

  console.log(formData);

  // validated data
  const validatedData = createUserDTOSchema.parse(formData);

  // hash password
  validatedData.password = await hashPassword(validatedData.password);

  //  create user
  await userLib.createNew(validatedData);

  const responseData = {
    success: true,
    message: "New user created successfully!",
    data: validatedData,
  };

  //send success response
  c.status(201)
  return c.json(responseData);
};

export { create as createUser };
