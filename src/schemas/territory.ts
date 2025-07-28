import { z } from "zod";

export const createTerritoryDTOSchema = z.object({
  sapTerritoryId: z.string().min(3),
  zone: z.string().min(3),
  region: z.string().min(3),
  territory: z.string().min(3),
});

export const updateTerritoryDTOSchema = createTerritoryDTOSchema.omit({}).partial();

export const territorysQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().default(1).optional(),
  size: z.coerce.number().default(20).optional(),
  search: z.string().optional(),
});

export type createTerritoryInputsTypes = z.infer<typeof createTerritoryDTOSchema>;
export type updateTerritoryInputTypes = z.infer<typeof updateTerritoryDTOSchema>;
export type territorysQueryInputTypes = z.infer<typeof territorysQuerySchema>;
