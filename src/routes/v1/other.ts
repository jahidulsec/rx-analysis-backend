import controller from "@/api/v1/other";
import { Hono } from "hono";

const other = new Hono();

// territory
other
  .get("/territory", controller.getTerritories)
  .post(controller.createTerritory);

other
  .get("/territory/:id", controller.getTerritory)
  .patch(controller.updateTerritory)
  .delete(controller.deleteTerritory);

export { other as otherRouter };
