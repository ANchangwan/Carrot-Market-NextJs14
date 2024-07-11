"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(100000).max(999999);

export default async function smsLogin(prevState: any, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };
  console.log(typeof formData.get("token"));
  console.log(typeof tokenSchema.parse(formData.get("token")));
  return null;
}
