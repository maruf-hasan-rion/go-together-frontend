"use client";

import { forgotPassword } from "@/services/auth/password";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import InputFieldError from "./shared/InputFieldError";

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <InputFieldError field="email" state={state} />
        </Field>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send reset link"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Remembered it?{" "}
              <Link href="/login" className="font-bold hover:underline">
                Back to login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
