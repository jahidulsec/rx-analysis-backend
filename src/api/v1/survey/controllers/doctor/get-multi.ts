import { surveyLib } from "@/lib/survey";
import { surveysQuerySchema } from "@/schemas/survey";
import { cleanedQuery } from "@/utils/helper";
import { paginate } from "@/utils/pagination";
import type { Context } from "hono";

const get = async (c: Context) => {
  const rawQuery = c.req.query();
  const queries = cleanedQuery(rawQuery);

  // validate incoming body data with defined schema
  const validatedData = surveysQuerySchema.parse(queries);

  //get all items with validated queries
  const { data, count } = await surveyLib.getMulti(validatedData);

  const responseData = {
    success: true,
    message: "All surveys get successfully!",
    data: data,
    pagination: {
      ...paginate(validatedData.page, validatedData.size, count),
    },
  };

  //send success response
  return c.json(responseData);
};

export { get as getSurveys };
