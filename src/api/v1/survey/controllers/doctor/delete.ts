import { drizzleError, notFoundError } from "@/lib/errors";
import { surveyLib } from "@/lib/survey";
import type { Context } from "hono";

const deleteOne = async (c: Context) => {
  // get params
  const { id } = c.req.param();

  // get survey
  const survey = await surveyLib.getSingle(id);

  if (survey.length === 0) {
    notFoundError("Survey does not exist");
  }

  try {
    //  delete survey
    await surveyLib.deleteOne(id);
  } catch (error) {
    // throw drizzle error response
    return drizzleError(c, error as Error);
  }

  const responseData = {
    success: true,
    message: "Survey deleted successfully!",
    data: survey,
  };

  //send success response
  return c.json(responseData);
};

export { deleteOne as deleteSurvey };
