import { createMedicine } from "./medicine/create";
import { deleteMedicine } from "./medicine/delete";
import { getMedicines } from "./medicine/get-multi";
import { getMedicine } from "./medicine/get-single";
import { updateMedicine } from "./medicine/update";
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
  getMedicine,
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
