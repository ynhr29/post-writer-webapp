import { z } from "zod"

export const postPatchSchema = z.object({
  title: z
    .string()
    .min(3, { message: "タイトルは3文字以上入力してください" })
    .max(128, { message: "タイトルは128文字以内で入力してください" }),
  content: z.any().optional(),
})

export type postPatchSchemaType = z.infer<typeof postPatchSchema>
