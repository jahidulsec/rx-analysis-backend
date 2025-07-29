import { createSurvey } from "./doctor/create";
import { deleteSurvey } from "./doctor/delete";
import { getSurveys } from "./doctor/get-multi";
import { getSurvey } from "./doctor/get-single";

export const controller = {
  getSurvey,
  getSurveys,
  createSurvey,
  deleteSurvey,
};
