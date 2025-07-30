import { z } from "zod";

export const createSurveyMedicineDTOSchema = z.object({
  surveyId: z.string().min(3),
  medicineId: z.string().min(3),
  quantity: z.coerce.number().min(1),
});

export const updateSurveyMedicineDTOSchema = createSurveyMedicineDTOSchema
  .omit({})
  .partial();

export const surveysMedicineQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().default(1).optional(),
  size: z.coerce.number().default(20).optional(),
  search: z.string().optional(),
});

export type createSurveyMedicineInputsTypes = z.infer<
  typeof createSurveyMedicineDTOSchema
>;
export type updateSurveyMedicineInputTypes = z.infer<
  typeof updateSurveyMedicineDTOSchema
>;
export type surveysMedicineQueryInputTypes = z.infer<typeof surveysMedicineQuerySchema>;
