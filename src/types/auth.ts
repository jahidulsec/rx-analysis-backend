import type { AdminRole } from "@/db/schema";

export interface AuthUser {
  id: string;
  teamMemberId?:string,
  name?: string;
  role: AdminRole;
  mobile?: string;
  iat: number;
}
