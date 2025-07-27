import controller from "@/api/v1/user";
import { Hono } from "hono";

const user = new Hono();

user.get("/user", controller.getUsers).post("/user", controller.createUser);

user
  .get("/user/:id", controller.getUser)
  .patch("/user/:id", controller.updateUser)
  .delete("/user/:id", controller.deleteUser);

export { user as userRouter };
