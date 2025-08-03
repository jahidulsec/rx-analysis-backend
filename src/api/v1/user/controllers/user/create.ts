import { drizzleError, validationError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { createUserDTOSchema } from "@/schemas/user";
import { hashPassword } from "@/utils/password";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const create = factory.createHandlers(
  // validator
  validator("json", (value, c) => {
    const result = createUserDTOSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return validationError(c, result);
    }

    // return formData
    return result.data;
  }),

  // controller
  async (c) => {
    //  get form data
    const formData = c.req.valid("json");

    // hash password
    formData.password = await hashPassword(formData.password);

    try {
      //  create user
      await userLib.createNew(formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    const responseData = {
      success: true,
      message: "New user created successfully!",
      data: formData,
    };

    //send success response
    c.status(201);
    return c.json(responseData);
  }
);

export { create as createUser };
