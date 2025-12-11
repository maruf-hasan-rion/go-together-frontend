"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerUser } from "@/services/auth/registerUser";
import { toast } from "sonner";
import Link from "next/link";
import InputFieldError from "./shared/InputFieldError";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* FullName */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
            />
            <InputFieldError  field="fullName" state={state} />
          </Field>
          {/* Email */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />

            <InputFieldError field="email" state={state} />
          </Field>
          {/* Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
            />

            <InputFieldError field="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-bold hover:underline">
                Login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
