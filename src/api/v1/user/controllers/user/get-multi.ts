import { notFoundError } from "@/lib/errors";
import { userLib } from "@/lib/user";
import { usersQuerySchema } from "@/schemas/user";
import type { Context, Next } from "hono";

const get = async (c: Context, next: Next) => {
//   try {
    const rawQuery = c.req.query();
    const cleanedQuery = Object.fromEntries(
      Object.entries(rawQuery).map(([key, value]) => [key, value === "" ? undefined : value])
    );

    notFoundError('Was not ofun')

    // validate incoming body data with defined schema
    const validatedData = usersQuerySchema.parse(cleanedQuery);

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
//   } catch (error) {
    // console.log("ERROR : ", JSON.stringify(error, null, 2));

    //send error response
    // await next();
    // return c.json("error");
//   }
};

export { get as getUsers };
