"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

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
import { forgotPassword } from "@/services/auth/password";
import { forgotPasswordZodSchema } from "@/zod/auth.validation";

type ForgotFormValues = z.infer<typeof forgotPasswordZodSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordZodSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotFormValues) => {
    const formData = new FormData();
    formData.set("email", values.email);

    const result = await forgotPassword(null, formData);

    if (result?.success) {
      toast.success(result.message);
    } else {
      for (const error of result?.errors ?? []) {
        form.setError(error.field as keyof ForgotFormValues, { message: error.message });
      }
      if (result?.message) toast.error(result.message);
    }
  };

  return (
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

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
        </Button>

        <p className="px-6 text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/login" className="font-bold hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
