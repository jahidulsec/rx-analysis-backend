import { createSurvey } from "./survey/create";
import { deleteSurvey } from "./survey/delete";
import { getSurveys } from "./survey/get-multi";
import { getSurvey } from "./survey/get-single";

export const controller = {
  getSurvey,
  getSurveys,
  createSurvey,
  deleteSurvey,
};
