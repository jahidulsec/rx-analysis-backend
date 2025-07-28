import { drizzleError, notFoundError, validationError } from "@/lib/errors";
import { territoryLib } from "@/lib/territory";
import { updateTerritoryDTOSchema } from "@/schemas/territory";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const update = factory.createHandlers(
  // validate form
  validator("json", (value, c) => {
    const result = updateTerritoryDTOSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return validationError(c, result);
    }

    // return formData
    return result.data;
  }),

  // controller
  async (c) => {
    //  get form data
    const formData = c.req.valid("json");

    // get params
    const id = c.req.param("id") as string;

    // get territory
    const territory = await territoryLib.getSingle(id);

    if (!territory || (Array.isArray(territory) && territory.length === 0)) {
      notFoundError("Territory does not exist");
    }

    //  update territory
    try {
      await territoryLib.updateOne(id as string, formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    const responseData = {
      success: true,
      message: "Territory updated successfully!",
      data: formData,
    };

    //send success response
    return c.json(responseData);
  }
);

export { update as updateTerritory };
