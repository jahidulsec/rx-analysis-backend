import { validationError } from "@/lib/errors";
import { statsLib } from "@/lib/stats";
import { createFactory } from "hono/factory";
import { validator } from "hono/validator";
import z from "zod";

const dateSchema = z.object({
  date: z.coerce.date().optional(),
});

const factory = createFactory();

const get = factory.createHandlers(
  validator("query", (value, c) => {
    const result = dateSchema.safeParse(value);

    if (!result.success) {
      return validationError(c, result);
    }

    return result.data;
  }),
  async (c) => {
    const query = c.req.valid("query");

    //get all items with validated queries
    const data = await statsLib.getTotalSurveyCount(query.date);

    const responseData = {
      success: true,
      message: "Get stats details successfully!",
      data: data,
    };

    //send success response
    return c.json(responseData);
  }
);

export { get as getStats };
