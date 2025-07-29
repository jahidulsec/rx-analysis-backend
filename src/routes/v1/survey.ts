import controller from "@/api/v1/survey";
import { Hono } from "hono";

const survey = new Hono();

survey.get("/survey", controller.getSurveys).post(...controller.createSurvey);

survey.get("/suvery/:id", controller.getSurvey).delete(controller.deleteSurvey);


export {survey as surveyRoutes}