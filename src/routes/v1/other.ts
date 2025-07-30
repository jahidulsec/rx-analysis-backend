import controller from "@/api/v1/other";
import { authorizeRole } from "@/middlewares/authorize";
import { Hono } from "hono";

const other = new Hono();

// territory
other
  .get("/territory", controller.getTerritories)
  .post(authorizeRole("territory", "create"), controller.createTerritory);

other
  .get(
    "/territory/:id",
    authorizeRole("territory", "view"),
    controller.getTerritory
  )
  .patch(authorizeRole("territory", "update"), ...controller.updateTerritory)
  .delete(authorizeRole("territory", "delete"), controller.deleteTerritory);

// medicine
other
  .get("/medicine", controller.getMedicines)
  .post(authorizeRole("medicine", "create"), controller.createMedicine);

other
  .get(
    "/medicine/:id",
    authorizeRole("medicine", "view"),
    controller.getMedicine
  )
  .patch(authorizeRole("medicine", "update"), ...controller.updateMedicine)
  .delete(authorizeRole("medicine", "delete"), controller.deleteMedicine);

export { other as otherRouter };
