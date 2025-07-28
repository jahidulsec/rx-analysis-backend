import { Hono } from "hono";
import { userRouter } from "./v1/user";
import { otherRouter } from "./v1/other";

const router = new Hono();

router.route("/user/v1", userRouter);
router.route("/other/v1", otherRouter);

export default router;
