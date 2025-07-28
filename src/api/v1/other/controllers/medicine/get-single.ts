import { notFoundError } from "@/lib/errors";
import { medicineLib } from "@/lib/medicine";
import type { Context } from "hono";

const get = async (c: Context) => {
  const { id } = c.req.param();

  //get all items with validated queries
  const data = await medicineLib.getSingle(id);

  // if no data, then throw 404
  if (data.length === 0) {
    notFoundError("medicine does not exist");
  }

  const responseData = {
    success: true,
    message: "Get medicine details successfully!",
    data: data[0],
  };

  //send success response
  return c.json(responseData);
};

export { get as getMedicine };
