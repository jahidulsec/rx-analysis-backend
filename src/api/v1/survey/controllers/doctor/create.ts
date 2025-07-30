import { surveyLib } from "@/lib/survey";
import { drizzleError, validationError } from "@/lib/errors";
import { createSurveyDTOSchema } from "@/schemas/survey";
import { Factory } from "hono/factory";
import { validator } from "hono/validator";
import type { AuthUser } from "@/types/auth";

const factory = new Factory();

const create = factory.createHandlers(
  // validator
  validator("json", (value, c) => {
    const result = createSurveyDTOSchema.safeParse(value);

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

    // get authuser
    const payload: AuthUser = await c.get("jwtPayload");

    formData.createdBy = payload.id;

    try {
      //  create survey
      await surveyLib.createNew(formData);
    } catch (error) {
      // throw drizzle error response
      return drizzleError(c, error as Error);
    }

    const responseData = {
      success: true,
      message: "New survey created successfully!",
      data: formData,
    };

    //send success response
    c.status(201);
    return c.json(responseData);
  }
);

export { create as createSurvey };
