"use server";

import { redirect } from "next/navigation";

export async function onSubmit(prevState: any, data: FormData) {
  await new Promise((response) => setTimeout(response, 4000));
  return {
    errors: ["wrong password", "password to short"],
  };
}
