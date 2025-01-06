import { z } from "zod";

export const errorSchema = z.object({
  message: z.string(),
  code: z.string(),
  //   fields with issues
  data: z.record(z.string(), z.string()).optional(),
});
