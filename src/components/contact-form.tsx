"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/services/contact/contact";
import { contactValidationZodSchema } from "@/zod/contact.validation";

type ContactFormValues = z.infer<typeof contactValidationZodSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactValidationZodSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("message", values.message);

    const result = await submitContact(null, formData);

    if (result?.success) {
      toast.success(result.message);
      form.reset();
    } else {
      for (const error of result?.errors ?? []) {
        form.setError(error.field as keyof ContactFormValues, { message: error.message });
      }
      if (result?.message) toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
