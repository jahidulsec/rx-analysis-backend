import { phoneRegex } from "@/utils/regex";
import { z } from "zod";

export const createDoctorDTOSchema = z.object({
  fullName: z.string().min(3),
  designation: z.string().min(3),
  mobile: z.string().regex(phoneRegex, "Invalid number"),
  territoryId: z.string().min(3),
});

export const updateDoctorDTOSchema = createDoctorDTOSchema
  .omit({})
  .partial();

export const doctorsQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().default(1).optional(),
  size: z.coerce.number().default(20).optional(),
  search: z.string().optional(),
});

export type createDoctorInputsTypes = z.infer<
  typeof createDoctorDTOSchema
>;
export type updateDoctorInputTypes = z.infer<
  typeof updateDoctorDTOSchema
>;
export type doctorsQueryInputTypes = z.infer<typeof doctorsQuerySchema>;
