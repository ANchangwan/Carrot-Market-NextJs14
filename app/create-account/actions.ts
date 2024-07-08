"use server";
import { z } from "zod";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자로 입력해주세요",
        required_error: "이름을 입력하세요",
      })
      .min(3, "너무 짧아요!!")
      .max(10, "너무 길어요!!")
      .refine((username) => false, "this is custom"),
    email: z
      .string({
        invalid_type_error: "이메일을 입력해주세요",
      })
      .email({
        message: "유효한 이메일을 입력해주세요!!!",
      }),
    password: z.string().min(10, "10자 이상을 입력해주세요"),
    confirmPassword: z.string().min(10, "10자 이상을 입력해주세요"),
  })
  .refine(checkPassword, {
    message: "패스워드가 서로 다릅니다!!",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
