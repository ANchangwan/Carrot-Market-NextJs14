"use server";
import {
  PASSWORD_MIN_LEGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";

const checkpotato = (username: string) => !username.includes("potato");

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(userEmail);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자로 입력해주세요",
        required_error: "이름을 입력하세요",
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `✅${username}`)
      .refine(checkpotato, "this is custom")
      .refine(checkUniqueUsername, "유저가 이미 존재합니다!"),
    email: z
      .string({
        invalid_type_error: "이메일을 입력해주세요",
      })
      .toLowerCase()
      .email({
        message: "유효한 이메일을 입력해주세요!!!",
      })
      .refine(checkUniqueEmail, "이미 존재하는 이메일주소입니다!!"),
    password: z
      .string()
      // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
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
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);
  }
}
