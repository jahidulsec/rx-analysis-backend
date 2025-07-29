import controller from "@/api/v1/user";
import { Hono } from "hono";

const user = new Hono();

// user
user.get("/user", controller.getUsers).post(controller.createUser);

user
  .get("/user/:id", controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

// doctor
user.get("/doctor", controller.getDoctors).post(...controller.createDoctor);

user
  .get("/doctor/:id", controller.getDoctor)
  .patch(...controller.updateDoctor)
  .delete(controller.deletedoctor);

export { user as userRouter };
