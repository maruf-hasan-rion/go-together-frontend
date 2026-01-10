"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { toast } from "sonner";

import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createEvent, updateEvent } from "@/services/events/events";
import { Event } from "@/types/event.interface";
import { useRouter } from "next/navigation";


interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
}

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
];

const safeSrc = (src?: string) => {
  if (!src) return "/images/event-placeholder.png";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return "/images/event-placeholder.png";
};

const EventForm = ({ event, onSuccess, onCancel }: EventFormProps) => {
  const router = useRouter();
  const isEdit = !!event;

  const [state, formAction, isPending] = useActionState(
    isEdit && event?.id ? updateEvent.bind(null, event.id) : createEvent,
    null
  );

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const successToastShownRef = useRef(false);

  const baseValues = useMemo(
    () => ({
      title: event?.title || "",
      location: event?.location || "",
      date: event?.eventDate
        ? (() => {
            const d = new Date(event.eventDate);
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, "0");
            const day = String(d.getUTCDate()).padStart(2, "0");
            const hours = String(d.getUTCHours()).padStart(2, "0");
            const minutes = String(d.getUTCMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          })()
        : "",
      capacity:
        event?.maxParticipants !== undefined && event?.maxParticipants !== null
          ? String(event.maxParticipants)
          : "",
      joiningFee:
        event?.joiningFee !== undefined && event?.joiningFee !== null
          ? String(event.joiningFee)
          : "",
      description: event?.description || "",
      type: Array.isArray(event?.type) ? event.type : [],
      fileToken: "",
    }),
    [event]
  );

  const [formValues, setFormValues] = useState(baseValues);
 console.log("selected types:", formValues.type);
  useEffect(() => {
    setFormValues(baseValues);
  }, [baseValues]);

  const normalizeCategories = (value: unknown): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.length > 0) return [value];
    return [];
  };

  const isDirty = useMemo(() => {
    if (!isEdit) return true;
    const baseCats = (baseValues.type || []).slice()?.sort()?.join("|");
    const currentCats = (formValues.type || []).slice().sort().join("|");
    return (
      formValues.fileToken !== "" ||
      formValues.title !== baseValues.title ||
      formValues.location !== baseValues.location ||
      formValues.date !== baseValues.date ||
      formValues.capacity !== baseValues.capacity ||
      formValues.joiningFee !== baseValues.joiningFee ||
      formValues.description !== baseValues.description ||
      currentCats !== baseCats
    );
  }, [baseValues, formValues, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setFormValues((prev) => ({ ...prev, fileToken: file ? file.name : "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeToggle = (type: string) => {
    setFormValues((prev) => {
      const exists = prev.type.includes(type);
      const next = exists
        ? prev.type.filter((c) => c !== type)
        : [...prev.type, type];
      return { ...prev, type: next };
    });
  };

  useEffect(() => {
    if (!state) {
      successToastShownRef.current = false;
    }

    if (state?.success && !successToastShownRef.current) {
      successToastShownRef.current = true;
      toast.success(state.message || "Event saved successfully!");

      formRef.current?.reset();
      setTimeout(() => setSelectedFile(null), 0);

      startTransition(() => setFormValues(baseValues));
      onSuccess?.();
       if (!isEdit && state?.data?.id) {
    router.push(`/events`);
  }
    } else if (state && !state.success) {
      toast.error(state.message || "Failed to save event. Please try again.");
    }

    if (selectedFile && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(selectedFile);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [state, onSuccess, selectedFile, baseValues, isEdit, router]);

  useEffect(() => {
    if (state?.formData) {
      startTransition(() => {
        setFormValues((prev) => ({
          ...prev,
          title: state.formData.title ?? prev.title,
          location: state.formData.location ?? prev.location,
          date: state.formData.date ?? prev.date,
          capacity: state.formData.capacity ?? prev.capacity,
          joiningFee: state.formData.joiningFee ?? prev.joiningFee,
          description: state.formData.description ?? prev.description,
          type: normalizeCategories(state.formData.type ?? prev.type),
        }));
      });
    }
  }, [state]);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <form ref={formRef} action={formAction} className="w-full">
      <div className="rounded-2xl border bg-card/60 p-4 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {isEdit ? "Update Event" : "Create New Event"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Fill in the details below. Fields marked with * are required.
            </p>
          </div>
        </div>

        <FieldGroup className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="title">Event Title *</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Weekend Hiking at Bandarban"
                value={formValues.title}
                onChange={handleChange}
                disabled={isPending}
                className="w-full text-sm"
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">Location *</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Dhaka, Bangladesh"
                value={formValues.location}
                onChange={handleChange}
                disabled={isPending}
                className="w-full text-sm"
              />
              <InputFieldError field="location" state={state} />
            </Field>

            {/* Date */}
            <Field>
              <FieldLabel htmlFor="date">Event Date & Time *</FieldLabel>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={formValues.date}
                onChange={handleChange}
                disabled={isPending}
                className="w-full text-sm"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pick a future date/time (at least tomorrow).
              </p>
              <InputFieldError field="date" state={state} />
            </Field>

            {/* Capacity */}
            <Field>
              <FieldLabel htmlFor="capacity">Capacity *</FieldLabel>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="e.g. 20"
                value={formValues.capacity}
                onChange={handleChange}
                disabled={isPending}
                min={0}
                className="w-full text-sm"
              />
              <InputFieldError field="capacity" state={state} />
            </Field>

            {/* Joining Fee */}
            <Field>
              <FieldLabel htmlFor="joiningFee">Joining Fee *</FieldLabel>
              <Input
                id="joiningFee"
                name="joiningFee"
                type="number"
                placeholder="e.g. 500"
                value={formValues.joiningFee}
                onChange={handleChange}
                disabled={isPending}
                min={0}
                className="w-full text-sm"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Set 0 if it’s free.
              </p>
              <InputFieldError field="joiningFee" state={state} />
            </Field>

            {/* Image Upload */}
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="file">Event Image *</FieldLabel>

              <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_240px] items-start">
                {/* Upload box */}
                <div className="rounded-xl border border-dashed p-4 bg-muted/30">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Upload an image</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG/JPG, up to 5MB. Recommended: 1200×630.
                      </p>
                    </div>
                    {formValues.fileToken ? (
                      <span className="text-[11px] px-2 py-1 rounded-md bg-[#45aaa2]/10 text-[#45aaa2]">
                        {formValues.fileToken}
                      </span>
                    ) : null}
                  </div>

                  <Input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    id="file"
                    name="file"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    disabled={isPending}
                    className="mt-3 w-full text-sm"
                  />
                  <InputFieldError field="image" state={state} />
                </div>

                {/* Preview */}
                <div className="rounded-xl overflow-hidden border bg-muted/20">
                  <div className="relative h-40 w-full">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Selected preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : isEdit && event?.image ? (
                      <Image
                        src={safeSrc(event.image)}
                        alt="Existing event"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/images/event-placeholder.png"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-80"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Field>

           {/* Categories */}
<Field className="sm:col-span-2">
  <FieldLabel>Categories *</FieldLabel>

  {/* IMPORTANT: Hidden inputs so FormData gets "type" */}
  <div className="sr-only">
    {formValues.type.map((t) => (
      <input key={t} type="hidden" name="type" value={t} />
    ))}
  </div>

  <div className="mt-2 flex flex-wrap gap-2">
    {EVENT_TYPE.map((type) => {
      const active = formValues.type.includes(type);

      return (
        <button
          key={type}
          type="button"
          disabled={isPending}
          onClick={() => handleTypeToggle(type)}
          className={[
            "px-3 py-1.5 rounded-full text-xs border transition",
            active
              ? "bg-[#45aaa2] text-white border-[#45aaa2]"
              : "bg-background hover:bg-muted border-border text-foreground",
            isPending ? "opacity-60 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {type.toLowerCase()}
        </button>
      );
    })}
  </div>

  <InputFieldError field="type" state={state} />
</Field>


            {/* Description */}
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="description">Description *</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell people what to expect, what to bring, meeting point, etc..."
                value={formValues.description}
                onChange={handleChange}
                disabled={isPending}
                className="w-full text-sm resize-none min-h-[120px]"
                rows={4}
              />
              <InputFieldError field="description" state={state} />
            </Field>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="sm:w-auto w-full"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || (isEdit && !isDirty)}
              className="sm:w-auto w-full bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium"
            >
              {isPending
                ? isEdit
                  ? "Updating Event..."
                  : "Creating Event..."
                : isEdit
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </FieldGroup>
      </div>
    </form>
  );
};

export default EventForm;
