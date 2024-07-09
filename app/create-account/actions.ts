"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkpotato = (username: string) => !username.includes("potato");

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
      .toLowerCase()
      .trim()
      .transform((username) => `✅${username}`)
      .refine(checkpotato, "this is custom"),
    email: z
      .string({
        invalid_type_error: "이메일을 입력해주세요",
      })
      .toLowerCase()
      .email({
        message: "유효한 이메일을 입력해주세요!!!",
      }),
    password: z
      .string()
      .regex(passwordRegex, "소문자 대문자 ")
      .min(4, "10자 이상을 입력해주세요"),
    confirmPassword: z.string().min(4, "10자 이상을 입력해주세요"),
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
  } else {
    console.log(result.data);
  }
}
