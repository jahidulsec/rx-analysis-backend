import { Hono } from "hono";
import { userRouter } from "./v1/user";

const router = new Hono()

router.route('/user/v1', userRouter)

export default router