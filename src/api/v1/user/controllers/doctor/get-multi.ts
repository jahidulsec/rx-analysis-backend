import { doctorLib } from "@/lib/doctor";
import { doctorsQuerySchema } from "@/schemas/doctor";
import type { AuthUser } from "@/types/auth";
import { cleanedQuery } from "@/utils/helper";
import { paginate } from "@/utils/pagination";
import type { Context } from "hono";

const get = async (c: Context) => {
  const rawQuery = c.req.query();
  const queries = cleanedQuery(rawQuery);

  // validate incoming body data with defined schema
  const validatedData = doctorsQuerySchema.parse(queries);

  // get authuser
  const payload: AuthUser = await c.get("jwtPayload");

  if (payload.role === "mio") {
    validatedData.territoryId = payload.username;
  }

  //get all items with validated queries
  const { data, count } = await doctorLib.getMulti(validatedData);

  const responseData = {
    success: true,
    message: "All doctors get successfully!",
    data: data,
    pagination: {
      ...paginate(validatedData.page, validatedData.size, count),
    },
  };

  //send success response
  return c.json(responseData);
};

export { get as getDoctors };
