// doctor
import { createDoctor } from "./doctor/create";
import { deletedoctor } from "./doctor/delete";
import { getDoctors } from "./doctor/get-multi";
import { getDoctor } from "./doctor/get-single";
import { updateDoctor } from "./doctor/update";
import { createUser } from "./user/create";

// user
import { deleteUser } from "./user/delete";
import { getUsers } from "./user/get-multi";
import { getUser } from "./user/get-single";
import { updateUser } from "./user/update";

export const controller = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deletedoctor,
};
