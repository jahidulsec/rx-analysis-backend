import { z } from "zod";

export const medicinesSchema = z.object({
  id: z.string(),
  quantity: z.coerce.number().min(1),
});

export const createSurveyDTOSchema = z.object({
  doctorId: z.string().min(3),
  createdBy: z.string().min(3),
  medicines: z.array(medicinesSchema).min(1),
});

export const updateSurveyDTOSchema = createSurveyDTOSchema.omit({}).partial();

export const surveysQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().default(1).optional(),
  size: z.coerce.number().default(20).optional(),
  search: z.string().optional(),
});

export type createSurveyInputsTypes = z.infer<typeof createSurveyDTOSchema>;
export type updateSurveyInputTypes = z.infer<typeof updateSurveyDTOSchema>;
export type surveysQueryInputTypes = z.infer<typeof surveysQuerySchema>;
