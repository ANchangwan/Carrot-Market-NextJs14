"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login-btn";
import { useFormState } from "react-dom";
import { onSubmit } from "./action";

export default function Login() {
  const [state, action] = useFormState(onSubmit, { hellow: 1 } as any);
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
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <FormBtn text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
