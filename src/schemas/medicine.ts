import { z } from "zod";

export const createMedicineDTOSchema = z.object({
  name: z.string().min(3),
  type: z.enum(["radiant", "competitor"]),
});

export const updateMedicineDTOSchema = createMedicineDTOSchema
  .omit({})
  .partial();

export const medicinesQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().default(1).optional(),
  size: z.coerce.number().default(20).optional(),
  search: z.string().optional(),
});

export type createMedicineInputsTypes = z.infer<typeof createMedicineDTOSchema>;
export type updateMedicineInputTypes = z.infer<typeof updateMedicineDTOSchema>;
export type medicinesQueryInputTypes = z.infer<typeof medicinesQuerySchema>;
