import { drizzleError, notFoundError } from "@/lib/errors";
import { doctorLib } from "@/lib/doctor";
import type { Context } from "hono";

const deleteOne = async (c: Context) => {
  // get params
  const { id } = c.req.param();

  // get doctor
  const doctor = await doctorLib.getSingle(id);

  if (doctor.length === 0) {
    notFoundError("Doctor does not exist");
  }

  try {
    //  delete doctor
    await doctorLib.deleteOne(id);
  } catch (error) {
    // throw drizzle error response
    return drizzleError(c, error as Error);
  }

  const responseData = {
    success: true,
    message: "Doctor deleted successfully!",
    data: doctor,
  };

  //send success response
  return c.json(responseData);
};

export { deleteOne as deletedoctor };
