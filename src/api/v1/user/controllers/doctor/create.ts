import { doctorLib } from "@/lib/doctor";
import { drizzleError, validationError } from "@/lib/errors";
import { createDoctorDTOSchema } from "@/schemas/doctor";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const create = factory.createHandlers(
  // validator
  validator("json", (value, c) => {
    const result = createDoctorDTOSchema.safeParse(value);

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

    try {
      //  create doctor
      await doctorLib.createNew(formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    const responseData = {
      success: true,
      message: "New doctor created successfully!",
      data: formData,
    };

    //send success response
    c.status(201);
    return c.json(responseData);
  }
);

export { create as createDoctor };
