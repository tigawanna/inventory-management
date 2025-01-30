import { z } from "zod";

export const auditAction = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "PASSWORD_RESET",
  "EMAIL_VERIFY",
] as const;
export const entityType = [
  "USER",
  "INVENTORY",
  "CATEGORY",
] as const;


export const auditlogEntityFilterSchema = z.enum(entityType);
export const auditlogActionFilterSchema = z.enum(auditAction);
