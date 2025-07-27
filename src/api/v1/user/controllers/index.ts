import { createUser } from "./user/create";
import { deleteUser } from "./user/delete";
import { getUsers } from "./user/get-multi";
import { getUser } from "./user/get-single";
import { updateUser } from "./user/update";

export const controller = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
