"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import type { z } from "zod";
import { z as zod } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, ImageIcon, Loader2 } from "lucide-react";

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
import { createEvent } from "@/services/events/events";

const EVENT_TYPE = [
  "CONCERT",
  "SPORTS",
  "HIKING",
  "GAMING",
  "DINNER",
  "TECH_MEETUP",
  "WORKSHOP",
  "OUTDOOR",
  "ARTS",
  "SOCIAL",
  "OTHER",
] as const;

const wizardSchema = zod.object({
  title: zod.string().min(3, "Title must be at least 3 characters"),
  description: zod.string().min(10, "Please write at least 10 characters"),
  type: zod.array(zod.string()).min(1, "Pick at least one category"),
  date: zod.string().min(1, "Pick a date and time"),
  location: zod.string().min(2, "Location is required"),
  capacity: zod.coerce.number().int().min(1, "Capacity must be at least 1"),
  joiningFee: zod.coerce.number().min(0, "Fee cannot be negative"),
});

type WizardValues = z.infer<typeof wizardSchema>;

const STEPS = ["Basics", "Schedule & capacity", "Image & review"] as const;

const stepFields: Record<number, (keyof WizardValues)[]> = {
  0: ["title", "description", "type"],
  1: ["date", "location", "capacity", "joiningFee"],
  2: [],
};

export default function CreateEventWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema) as unknown as Resolver<WizardValues>,
    defaultValues: {
      title: "",
      description: "",
      type: [],
      date: "",
      location: "",
      capacity: 10,
      joiningFee: 0,
    },
    mode: "onTouched",
  });

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const values = useWatch({ control: form.control });

  const goNext = async () => {
    const valid = await form.trigger(stepFields[step]);
    if (valid) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const onSubmit = async (data: WizardValues) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("description", data.description);
    formData.set("location", data.location);
    formData.set("date", new Date(data.date).toISOString());
    formData.set("capacity", String(data.capacity));
    formData.set("joiningFee", String(data.joiningFee));
    for (const type of data.type) formData.append("type", type);
    if (file) formData.set("file", file);

    const result = await createEvent(null, formData);

    if (result?.success) {
      toast.success(result.message || "Event created successfully!");
      router.push("/host/dashboard/manage-events");
    } else {
      toast.error(result?.message || "Failed to create event. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Create Event</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Set up your event in three quick steps.
      </p>

      {/* Step indicator */}
      <ol className="mt-6 flex items-center gap-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                index < step
                  ? "bg-primary text-primary-foreground"
                  : index === step
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {index < step ? <Check className="h-4 w-4" /> : index + 1}
            </span>
            <span
              className={`hidden text-sm sm:block ${
                index === step ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {index < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-4 rounded-xl border bg-card p-5 shadow-sm"
        >
          {step === 0 && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Weekend Hiking at Bandarban" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="What should people expect?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {EVENT_TYPE.map((type) => {
                        const active = field.value.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                active
                                  ? field.value.filter((value) => value !== type)
                                  : [...field.value, type],
                              )
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "bg-background hover:bg-muted"
                            }`}
                          >
                            {type.toLowerCase()}
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date &amp; time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Dhaka, Bangladesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="joiningFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining fee (BDT)</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <p className="mb-2 text-sm font-medium">Event image (optional)</p>
                <label
                  htmlFor="event-image"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 p-6 text-center"
                >
                  {previewUrl ? (
                    <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-lg">
                      <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        PNG or JPG, up to 5MB
                      </span>
                    </>
                  )}
                  <input
                    id="event-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="sr-only"
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {file.name} · {(file.size / 1024).toFixed(0)} KB
                  </p>
                )}
              </div>

              <div className="rounded-lg border bg-muted/20 p-4 text-sm">
                <p className="font-medium">Review</p>
                <dl className="mt-2 grid grid-cols-1 gap-1 text-muted-foreground sm:grid-cols-2">
                  <div>
                    <span className="font-medium text-foreground">Title:</span> {values.title || "—"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Location:</span>{" "}
                    {values.location || "—"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Date:</span>{" "}
                    {values.date ? new Date(values.date).toLocaleString() : "—"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Capacity:</span>{" "}
                    {values.capacity}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Fee:</span>{" "}
                    {values.joiningFee ? `৳${values.joiningFee}` : "Free"}
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-medium text-foreground">Categories:</span>{" "}
                    {values.type.join(", ") || "—"}
                  </div>
                </dl>
              </div>
            </>
          )}

          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={goBack} disabled={step === 0}>
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={goNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create event"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
