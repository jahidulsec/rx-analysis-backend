import { notFoundError } from "@/lib/errors";
import { surveyLib } from "@/lib/survey";
import { surveyMedicineLib } from "@/lib/survey-medicine";
import type { Context } from "hono";

const get = async (c: Context) => {
  const { id } = c.req.param();

  //get all items with validated queries
  const data = await surveyLib.getSingle(id);

  // if no data, then throw 404
  if (data.length === 0) {
    notFoundError("survey does not exist");
  }

  // get survey medicines
  const medicines = await surveyMedicineLib.getMulti({ search: data[0].id });

  const responseData = {
    success: true,
    message: "Get survey details successfully!",
    data: { ...data[0], medicines: medicines.data },
  };

  //send success response
  return c.json(responseData);
};

export { get as getSurvey };
