import { drizzleError, notFoundError, validationError } from "@/lib/errors";
import { doctorLib } from "@/lib/doctor";
import { updateDoctorDTOSchema } from "@/schemas/doctor";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";

const factory = new Factory();

const update = factory.createHandlers(
  // validate form
  validator("json", (value, c) => {
    const result = updateDoctorDTOSchema.safeParse(value);

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

    // get doctor
    const doctor = await doctorLib.getSingle(id);

    if (!doctor || (Array.isArray(doctor) && doctor.length === 0)) {
      notFoundError("Doctor does not exist");
    }

    //  update doctor
    try {
      await doctorLib.updateOne(id as string, formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    const responseData = {
      success: true,
      message: "Doctor updated successfully!",
      data: formData,
    };

    //send success response
    return c.json(responseData);
  }
);

export { update as updateDoctor };
