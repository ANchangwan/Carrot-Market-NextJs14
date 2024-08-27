"use client";
import Button from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login-btn";
import { useFormState } from "react-dom";
import { login } from "./action";
import { PASSWORD_MIN_LEGTH } from "@/lib/constants";
import { useActionState } from "react";

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="write Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
          minLength={PASSWORD_MIN_LEGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
