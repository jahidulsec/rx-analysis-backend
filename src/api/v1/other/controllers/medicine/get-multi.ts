import { medicineLib } from "@/lib/medicine";
import { medicinesQuerySchema } from "@/schemas/medicine";
import { cleanedQuery } from "@/utils/helper";
import { paginate } from "@/utils/pagination";
import type { Context } from "hono";

const get = async (c: Context) => {
  const rawQuery = c.req.query();
  const queries = cleanedQuery(rawQuery);

  // validate incoming body data with defined schema
  const validatedData = medicinesQuerySchema.parse(queries);

  //get all items with validated queries
  const { data, count } = await medicineLib.getMulti(validatedData);

  const responseData = {
    success: true,
    message: "All medicines get successfully!",
    data: data,
    pagination: {
      ...paginate(validatedData.page, validatedData.size, count),
    },
  };

  //send success response
  return c.json(responseData);
};

export { get as getMedicines };
