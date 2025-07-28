import { territoryLib } from "@/lib/territory";
import { territorysQuerySchema } from "@/schemas/territory";
import { cleanedQuery } from "@/utils/helper";
import { paginate } from "@/utils/pagination";
import type { Context } from "hono";

const get = async (c: Context) => {
  const rawQuery = c.req.query();
  const queries = cleanedQuery(rawQuery);

  // validate incoming body data with defined schema
  const validatedData = territorysQuerySchema.parse(queries);

  //get all items with validated queries
  const { data, count } = await territoryLib.getMulti(validatedData);

  const responseData = {
    success: true,
    message: "All territories get successfully!",
    data: data,
    pagination: {
      ...paginate(validatedData.page, validatedData.size, count),
    },
  };

  //send success response
  return c.json(responseData);
};

export { get as getTerritories };
