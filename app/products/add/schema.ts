import { z } from "zod";

export const productSchema = z.object({
  photo: z
    .string({
      required_error: "Photo is required",
    })
    .refine((file) => file !== "/undefined", { message: "파일이 없습니다.!!" }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .max(20),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

export type productType = z.infer<typeof productSchema>;
