import { notFoundError } from "@/lib/errors";
import { territoryLib } from "@/lib/territory";
import { updateTerritoryDTOSchema } from "@/schemas/territory";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const update = factory.createHandlers(
  validator("json", (value, c) => {
    // validated data
    const validatedData = updateTerritoryDTOSchema.safeParse(value);

    if (!validatedData.success) {
      return c.json({
        status: false,
        error: "Zod Error",
        errors: validatedData.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      });
    }

    return validatedData.data;
  }),
  async (c) => {
    //  get form data
    const formData = c.req.valid("json");

    // get params
    const id = c.req.param("id");

    // get territory
    const territory = await territoryLib.getSingle(id as string);

    if (territory.length === 0) {
      notFoundError("Territory does not exist");
    }

    //  create territory
    await territoryLib.updateOne(id as string, formData);

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
