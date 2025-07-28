import { notFoundError } from "@/lib/errors";
import { medicineLib } from "@/lib/medicine";
import type { Context } from "hono";

const deleteOne = async (c: Context) => {
  // get params
  const { id } = c.req.param();

  // get medicine
  const medicine = await medicineLib.getSingle(id);

  if (medicine.length === 0) {
    notFoundError("medicine does not exist");
  }

  //  create user
  await medicineLib.deleteOne(id);

  const responseData = {
    success: true,
    message: "User deleted successfully!",
    data: medicine,
  };

  //send success response
  return c.json(responseData);
};

export { deleteOne as deleteMedicine };
