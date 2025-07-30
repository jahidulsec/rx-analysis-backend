import controller from "@/api/v1/survey";
import { authorizeRole } from "@/middlewares/authorize";
import { Hono } from "hono";

const survey = new Hono();

survey
  .get("/survey", controller.getSurveys)
  .post(authorizeRole("survey", "create"), ...controller.createSurvey);

survey
  .get("/survey/:id", authorizeRole("survey", "view"), controller.getSurvey)
  .delete(authorizeRole("survey", "delete"), controller.deleteSurvey);

export { survey as surveyRoutes };
