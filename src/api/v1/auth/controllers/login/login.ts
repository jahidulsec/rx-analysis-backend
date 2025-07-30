import { badRequestError, notFoundError, validationError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { userLoginDTOSchema } from "@/schemas/user";
import { isValidPassword } from "@/utils/password";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const login = factory.createHandlers(
  validator("json", (value, c) => {
    const result = userLoginDTOSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return validationError(c, result);
    }

    // return formData
    return result.data;
  }),

  async (c) => {
    // get validated form data
    const formData = c.req.valid("json");

    const data = await userLib.getSingleByUsername(formData.username);

    if (data && data?.length === 0) {
      notFoundError("User does not exist");
    }

    //  check password
    if (
      !(await isValidPassword(formData.password, data[0]?.password as string))
    ) {
      return badRequestError("Incorrect password");
    }

    //  generate tokens
    const accessToken = await generateAccessToken(
      data[0].id as string,
      data[0].username as string,
      data[0].role as string
    );
    const refreshToken = await generateRefreshToken(data[0]?.id as string);

    const responseData = {
      success: true,
      message: "You are successfully logged in",
      data: {
        id: data[0]?.id,
        username: data[0]?.username,
        fullName: data[0]?.fullName,
        role: data[0]?.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };

    //send success response
    c.status(201);
    return c.json(responseData);
  }
);

export { login };
