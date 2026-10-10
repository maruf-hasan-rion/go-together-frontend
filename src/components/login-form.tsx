"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import GoogleLoginButton from "./google-login-button";
import { loginUser } from "@/services/auth/loginUser";
import { demoLogin, DEMO_CREDENTIALS, type DemoRole } from "@/services/auth/demoLogin";
import { loginValidationZodSchema } from "@/zod/auth.validation";

type LoginFormValues = z.infer<typeof loginValidationZodSchema>;

const DEMO_BUTTONS: { role: DemoRole; label: string; className: string }[] = [
  { role: "ADMIN", label: "Admin", className: "border-purple-300 text-purple-700 hover:bg-purple-50" },
  { role: "HOST", label: "Host", className: "border-blue-300 text-blue-700 hover:bg-blue-50" },
  { role: "USER", label: "User", className: "border-emerald-300 text-emerald-700 hover:bg-emerald-50" },
];

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [isDemoPending, startDemo] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationZodSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    if (redirect) formData.set("redirect", redirect);

    const result = await loginUser(null, formData);

    if (result && !result.success) {
      for (const error of result.errors ?? []) {
        form.setError(error.field as keyof LoginFormValues, {
          message: error.message,
        });
      }
      toast.error(result.message || "Login failed");
    }
  };

  const handleDemoLogin = (role: DemoRole) => {
    startDemo(async () => {
      const result = await demoLogin(role as DemoRole);
      if (result && !result.success) {
        toast.error(result.message || "Demo login failed");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* One-click demo logins */}
      <div className="rounded-lg border border-dashed bg-muted/30 p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-semibold">One-click demo login</p>
          <span className="text-xs text-muted-foreground">password: {DEMO_CREDENTIALS.ADMIN.password}</span>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          Jump straight into a role — no typing required.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_BUTTONS.map((button) => (
            <Button
              key={button.role}
              type="button"
              variant="outline"
              disabled={isDemoPending}
              onClick={() => handleDemoLogin(button.role)}
              className={button.className}
            >
              {isDemoPending ? "..." : button.label}
            </Button>
          ))}
        </div>
        <div className="mt-3 space-y-0.5 text-xs text-muted-foreground">
          {DEMO_BUTTONS.map((button) => (
            <div key={button.role}>
              <span className="font-medium">{button.label}:</span>{" "}
              {DEMO_CREDENTIALS[button.role].email}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or sign in with email</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input placeholder="••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="my-2 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <GoogleLoginButton />

          <p className="px-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
