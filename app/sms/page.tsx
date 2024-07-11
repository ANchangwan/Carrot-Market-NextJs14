"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login-btn";
import { useFormState } from "react-dom";
import smsLogin from "./action";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state?.token ? (
          <Input
            key={"token"}
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            key={"phone"}
            name="phone"
            type="number"
            placeholder="Phone Number"
            required
            errors={state.error?.formErrors}
          />
        )}

        <Button text={state.token ? "Varify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
}
