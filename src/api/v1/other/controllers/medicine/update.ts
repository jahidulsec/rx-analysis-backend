import { notFoundError } from "@/lib/errors";
import { medicineLib } from "@/lib/medicine";
import { updateMedicineDTOSchema } from "@/schemas/medicine";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const update = factory.createHandlers(
  validator("json", (value, c) => {
    const result = updateMedicineDTOSchema.safeParse(value);

    // throw validator error response
    if (!result.success) {
      return c.json(
        {
          success: false,
          error: "ValidationError",
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
            code: issue.code,
          })),
        },
        422
      );
    }

    // return formData
    return result.data;
  }),

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
      const cause = (error as Error).cause as any;
      return c.json(
        {
          success: false,
          code: 40003,
          error: cause?.code || "DrizzleError",
          message: (error as Error).message,
        },
        400
      );
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
