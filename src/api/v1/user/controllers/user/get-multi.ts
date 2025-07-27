import { userLib } from "@/lib/user";
import { usersQuerySchema } from "@/schemas/user";
import { cleanedQuery } from "@/utils/helper";
import type { Context, Next } from "hono";

const get = async (c: Context, next: Next) => {
  const rawQuery = c.req.query();
  const queries = cleanedQuery(rawQuery);

  // validate incoming body data with defined schema
  const validatedData = usersQuerySchema.parse(queries);

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
};

export { get as getUsers };
