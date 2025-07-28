import { createTerritory } from "./territory/create";
import { deleteTerritory } from "./territory/delete";
import { getTerritories } from "./territory/get-multi";
import { getTerritory } from "./territory/get-single";
import { updateTerritory } from "./territory/update";

export const controller = {
  getTerritories,
  getTerritory,
  createTerritory,
  updateTerritory,
  deleteTerritory,
};
