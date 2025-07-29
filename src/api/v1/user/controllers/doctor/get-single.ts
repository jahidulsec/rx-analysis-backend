import { notFoundError } from "@/lib/errors";
import { doctorLib } from "@/lib/doctor";
import type { Context } from "hono";

const get = async (c: Context) => {
  const { id } = c.req.param();

  //get all items with validated queries
  const data = await doctorLib.getSingle(id);

  // if no data, then throw 404
  if (data.length === 0) {
    notFoundError("doctor does not exist");
  }

  const responseData = {
    success: true,
    message: "Get doctor details successfully!",
    data: data[0],
  };

  //send success response
  return c.json(responseData);
};

export { get as getDoctor };
