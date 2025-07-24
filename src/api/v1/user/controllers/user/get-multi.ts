import { userLib } from "@/lib/user";
import { usersQuerySchema } from "@/schemas/user";
import type { Context, Next } from "hono";

const get = async (c: Context, next: Next) => {
  try {
    // validate incoming body data with defined schema
    // const validatedData = usersQuerySchema.parse(c.req.query);

    //get all items with validated queries
    const data = await userLib.getMulti();

    const responseData = {
      success: true,
      message: "All users get successfully!",
      data: data,
      //   pagination: {
      //     ...paginate(validatedData.page, validatedData.size, count),
      //   },
    };

    //send success response
    return c.json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    // await next();
    return c.json("error");
  }
};

export { get as getUsers };
