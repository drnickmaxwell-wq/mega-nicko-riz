import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.enum(["implants","spark-aligners","3d-printed-veneers","cosmetic","whitening","other"]).default("other"),
});
export type Lead = z.infer<typeof LeadSchema>;
