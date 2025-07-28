import { territoryLib } from "@/lib/territory";
import { createTerritoryDTOSchema } from "@/schemas/territory";
import type { Context } from "hono";

const create = async (c: Context) => {
  //  get form data
  const formData = await c.req.json();

  console.log(formData);

  // validated data
  const validatedData = createTerritoryDTOSchema.parse(formData);

  //  create territory
  await territoryLib.createNew(validatedData);

  const responseData = {
    success: true,
    message: "New territory created successfully!",
    data: validatedData,
  };

  //send success response
  c.status(201);
  return c.json(responseData);
};

export { create as createTerritory };
