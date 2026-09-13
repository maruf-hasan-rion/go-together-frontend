"use client";

import { resetPassword } from "@/services/auth/password";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import InputFieldError from "./shared/InputFieldError";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      const timer = setTimeout(() => router.push("/login"), 1500);
      return () => clearTimeout(timer);
    }
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={token} />
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          <Field>
            <FieldLabel htmlFor="newPassword">New password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••"
            />
            <InputFieldError field="newPassword" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
            />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Resetting..." : "Reset password"}
            </Button>

            <FieldDescription className="px-6 text-center">
              You will be redirected to login after a successful reset.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
