import { forbiddenError, notFoundError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { generateAccessToken, validateRefreshToken } from "@/utils/token";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";
import z from "zod";

const tokenSchema = z.object({
  refreshToken: z.string().min(3),
});

const factory = new Factory();

const revoke = factory.createHandlers(
  // validator
  validator("json", (value, c) => {
    const result = tokenSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return forbiddenError("Add a refresh token");
    }

    // return formData
    return result.data;
  }),

  //   controller
  async (c) => {
    // get formdata
    const formData = c.req.valid("json");

    let data = await validateRefreshToken(formData.refreshToken);

    // check user
    const user = await userLib.getSingle(data?.id as string);

    if (user.length === 0) {
      notFoundError("User does not exist");
    }

    // generate token
    const accessToken = await generateAccessToken(
      user[0]?.id as string,
      user[0]?.fullName as string,
      user[0]?.role as string
    );

    const responseData = {
      success: true,
      message: `Token revoke successful`,
      data: {
        accessToken: accessToken,
      },
    };

    //send success response
    c.status(201);
    return c.json(responseData);
  }
);

export { revoke as revokeToken };
