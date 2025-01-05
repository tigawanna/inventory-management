import { z } from "zod";

const basseUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["user", "admin"]).default("user").optional(),
    avatar: z.string().url().optional(),
});

