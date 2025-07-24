import { z } from "zod";

export const createUserDTOSchema = z.object({
  username: z.string(),
  password: z.string().optional(),
  full_name: z.string(),
  role: z.enum(["superadmin", "chq-admin", "mio"]),
});

export const updateUserDTOSchema = createUserDTOSchema.omit({}).partial();

export const usersQuerySchema = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().optional(),
  size: z.coerce.number().optional(),
  search: z.string().optional(),
});

export type createUserInputsTypes = z.infer<typeof createUserDTOSchema>;
export type updateUserInputTypes = z.infer<typeof updateUserDTOSchema>;
export type usersQueryInputTypes = z.infer<typeof usersQuerySchema>;

// login

export const userLoginDTOSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type usersLoginInputTypes = z.infer<typeof userLoginDTOSchema>;
