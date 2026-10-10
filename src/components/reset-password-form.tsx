"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { resetPassword } from "@/services/auth/password";
import { resetPasswordZodSchema } from "@/zod/auth.validation";

type ResetFormValues = z.infer<typeof resetPasswordZodSchema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordZodSchema),
    defaultValues: { token, newPassword: "", confirmPassword: "" },
  });
  const router = useRouter();

  const onSubmit = async (values: ResetFormValues) => {
    const formData = new FormData();
    formData.set("token", values.token);
    formData.set("newPassword", values.newPassword);
    formData.set("confirmPassword", values.confirmPassword);

    const result = await resetPassword(null, formData);

    if (result?.success) {
      toast.success(result.message);
      setTimeout(() => router.push("/login"), 1500);
    } else {
      for (const error of result?.errors ?? []) {
        form.setError(error.field as keyof ResetFormValues, { message: error.message });
      }
      if (result?.message) toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* token is carried in form state, not shown to the user */}
        <input type="hidden" {...form.register("token")} />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Resetting..." : "Reset password"}
        </Button>

        <p className="px-6 text-center text-sm text-muted-foreground">
          You will be redirected to login after a successful reset.
        </p>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
