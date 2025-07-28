import { drizzleError, notFoundError, validationError } from "@/lib/errors";
import { medicineLib } from "@/lib/medicine";
import { updateMedicineDTOSchema } from "@/schemas/medicine";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const update = factory.createHandlers(
  // validate form
  validator("json", (value, c) => {
    const result = updateMedicineDTOSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return validationError(c, result);
    }

    // return formData
    return result.data;
  }),

  // controller
  async (c) => {
    const formData = c.req.valid("json");
    const id = c.req.param("id") as string;

    // get existing medicine
    const medicine = await medicineLib.getSingle(id);

    if (!medicine || (Array.isArray(medicine) && medicine.length === 0)) {
      notFoundError("Medicine does not exist");
    }

    // update medicine
    try {
      await medicineLib.updateOne(id, formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    // response
    return c.json({
      success: true,
      message: "Medicine updated successfully!",
      data: formData,
    });
  }
);

export { update as updateMedicine };
