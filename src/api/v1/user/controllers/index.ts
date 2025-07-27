import { createUser } from "./user/create";
import { getUsers } from "./user/get-multi";
import { getUser } from "./user/get-single";

export const controller = {
  getUsers,
  getUser,
  createUser,
};
