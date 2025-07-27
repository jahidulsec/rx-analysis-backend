import controller from "@/api/v1/user";
import { Hono } from "hono";

const user = new Hono().basePath("/user");

user.get("/", controller.getUsers).post("/", controller.createUser);

user.get("/:id", controller.getUser);

export { user as userRouter };
