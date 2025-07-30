import type { AdminRole } from "@/db/schema";

export interface AuthUser {
  id: string;
  username?: string;
  role: AdminRole;
  iat: number;
}
