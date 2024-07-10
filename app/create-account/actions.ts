"use server";
import {
  PASSWORD_MIN_LEGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

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
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
      .min(PASSWORD_MIN_LEGTH, "10자 이상을 입력해주세요"),
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
