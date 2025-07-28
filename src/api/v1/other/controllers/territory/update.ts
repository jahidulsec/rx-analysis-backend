import { notFoundError } from "@/lib/errors";
import { territoryLib } from "@/lib/territory";
import { updateTerritoryDTOSchema } from "@/schemas/territory";
import type { Context } from "hono";

const update = async (c: Context) => {
  //  get form data
  const formData = await c.req.json();

  // get params
  const { id } = c.req.param();

  // validated data
  const validatedData = updateTerritoryDTOSchema.parse(formData);

  // get territory
  const territory = await territoryLib.getSingle(id);

  if (territory.length === 0) {
    notFoundError("Territory does not exist");
  }

  //  create territory
  await territoryLib.updateOne(id, validatedData);

  const responseData = {
    success: true,
    message: "Territory updated successfully!",
    data: validatedData,
  };

  //send success response
  return c.json(responseData);
};

export { update as updateTerritory };
