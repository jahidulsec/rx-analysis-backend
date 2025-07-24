import controller from "@/api/v1/user";
import { Hono } from "hono";

const router = new Hono();

router.get("/user", controller.getUsers);

export { router as userRouter };
