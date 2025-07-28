import controller from "@/api/v1/other";
import { Hono } from "hono";

const other = new Hono();

// territory
other
  .get("/territory", controller.getTerritories)
  .post(controller.createTerritory);

other
  .get("/territory/:id", controller.getTerritory)
  .patch(...controller.updateTerritory)
  .delete(controller.deleteTerritory);

// medicine
other.get("/medicine", controller.getMedicines).post(controller.createMedicine);

other
  .get("/medicine/:id", controller.getMedicine)
  .patch(...controller.updateMedicine)
  .delete(controller.deleteMedicine);

export { other as otherRouter };
