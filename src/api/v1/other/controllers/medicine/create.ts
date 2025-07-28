import { medicineLib } from "@/lib/medicine";
import { createMedicineDTOSchema } from "@/schemas/medicine";
import type { Context } from "hono";

const create = async (c: Context) => {
  //  get form data
  const formData = await c.req.json();

  console.log(formData);

  // validated data
  const validatedData = createMedicineDTOSchema.parse(formData);

  //  create medicine
  await medicineLib.createNew(validatedData);

  const responseData = {
    success: true,
    message: "New medicine created successfully!",
    data: validatedData,
  };

  //send success response
  c.status(201);
  return c.json(responseData);
};

export { create as createMedicine };
