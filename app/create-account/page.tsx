"use client";

import Input from "@/components/input";
import SocialLogin from "@/components/social-login-btn";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Button from "@/components/button";
import { PASSWORD_MIN_LEGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, trigger] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to Join</h2>
      </div>
      <form action={trigger} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="write username"
          required
          min={3}
          max={10}
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="write Email"
          required
          minLength={4}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required
          minLength={PASSWORD_MIN_LEGTH}
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LEGTH}
          errors={state?.fieldErrors.confirmPassword}
        />

        <Button text="Create Account" />
      </form>

      <SocialLogin />
    </div>
  );
}
