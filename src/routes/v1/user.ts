import controller from "@/api/v1/user";
import { Hono } from "hono";
import { authorizeRole } from "@/middlewares/authorize";
import { doctorLib } from "@/lib/doctor";
import { userLib } from "@/lib/user";

const user = new Hono();

// user
user
  .get("/user", authorizeRole("user", "view"), controller.getUsers)
  .post(authorizeRole("user", "create"), controller.createUser);

user
  .get(
    "/user/:id",
    authorizeRole("user", "view", async (c) => {
      const id = c.req.param("id");
      const doctor = await userLib.getSingleUserPermission(id);
      return doctor;
    }),
    controller.getUser
  )
  .patch(authorizeRole("user", "update"), controller.updateUser)
  .delete(authorizeRole("user", "delete"), controller.deleteUser);

// doctor
user
  .get("/doctor", controller.getDoctors)
  .post(authorizeRole("doctor", "create"), ...controller.createDoctor);

user
  .get(
    "/doctor/:id",
    authorizeRole("doctor", "view", async (c) => {
      const id = c.req.param("id");
      const doctor = await doctorLib.getSingleDoctorPermission(id);
      return doctor;
    }),
    controller.getDoctor
  )
  .patch(authorizeRole("doctor", "update"), ...controller.updateDoctor)
  .delete(authorizeRole("doctor", "delete"), controller.deletedoctor);

export { user as userRouter };
