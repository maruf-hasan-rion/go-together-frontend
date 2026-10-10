"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import type { Event } from "@/types/event.interface";
import type { UserInfo } from "@/types/user.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Calendar,
  Loader2,
  Upload,
  X,
  Trash2,
  Save,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  Users,
  DollarSign,
  FileText,
  Eye,
} from "lucide-react";

import { deleteEvent, updateEvent } from "@/services/events/events";

// ✅ Must match your EventForm EVENT_TYPE
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

// ✅ Schema matches DB + event-form
const editEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"), // datetime-local
  capacity: z.coerce.number().min(1, "Capacity is required"),
  joiningFee: z.coerce.number().min(0, "Fee must be 0 or greater"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.array(z.string()).min(1, "At least one type is required"),
  status: z.enum(["OPEN", "FULL", "CANCELLED", "COMPLETED"]).optional(),
});

type EditEventValues = z.infer<typeof editEventSchema>;

type Props = {
  event: Event;
  user: UserInfo;
};

function toDatetimeLocalUTC(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditEvent({ event, user }: Props) {
  const router = useRouter();
  const eventId = event?.id as string;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const canEdit = useMemo(() => {
    const isHost = user?.id === event?.hostId;
    const isAdmin = user?.role === "ADMIN";
    return isHost || isAdmin;
  }, [user, event]);

  const form = useForm<EditEventValues>({
    resolver: zodResolver(editEventSchema) as unknown as Resolver<EditEventValues>,
    defaultValues: {
      title: "",
      location: "",
      date: "",
      capacity: 10,
      joiningFee: 0,
      description: "",
      type: [],
      status: "OPEN",
    },
  });

  // ✅ Load event data (DB -> form)
  useEffect(() => {
    if (!event) return;

    // DB field: image
    if (event.image) setImagePreview(event.image);

    form.reset({
      title: event.title ?? "",
      location: event.location ?? "",
      date: toDatetimeLocalUTC(event.eventDate),
      capacity: event.maxParticipants ?? 10,
      joiningFee: event.joiningFee ?? 0,
      description: event.description ?? "",
      type: Array.isArray(event.type) ? event.type : [],
      status: (event.status ?? "OPEN") as EditEventValues["status"],
    });

    setHasChanges(false);
    setImageFile(null);
  }, [event, form]);

  // Track changes
  useEffect(() => {
    const sub = form.watch(() => setHasChanges(true));
    return () => sub.unsubscribe();
  }, [form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageFile(file);
    setHasChanges(true);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setHasChanges(true);
  };

  const onSubmit = async (values: EditEventValues) => {
    if (!canEdit) return;

    // ✅ SAME AS createEvent: { data: JSON, file: Blob }
    const newFormData = new FormData();

    const eventData = {
      title: values.title,
      location: values.location,
      eventDate: values.date,
      maxParticipants: Number(values.capacity),
      joiningFee: Number(values.joiningFee),
      description: values.description,
      type: values.type,
      status: values.status ?? "OPEN",
    };

    newFormData.append("data", JSON.stringify(eventData));

    // ✅ backend expects "file"
    if (imageFile) newFormData.append("file", imageFile);

    // Prevent useless submit if nothing changed
    const initial = {
      title: event.title ?? "",
      location: event.location ?? "",
      date: toDatetimeLocalUTC(event.eventDate),
      capacity: event.maxParticipants ?? 10,
      joiningFee: event.joiningFee ?? 0,
      description: event.description ?? "",
      type: Array.isArray(event.type) ? event.type : [],
      status: (event.status ?? "OPEN") as EditEventValues["status"],
    };

    const changed =
      values.title !== initial.title ||
      values.location !== initial.location ||
      values.date !== initial.date ||
      Number(values.capacity) !== Number(initial.capacity) ||
      Number(values.joiningFee) !== Number(initial.joiningFee) ||
      values.description !== initial.description ||
      (values.type || []).slice().sort().join("|") !==
        (initial.type || []).slice().sort().join("|") ||
      (values.status ?? "OPEN") !== (initial.status ?? "OPEN") ||
      !!imageFile;

    if (!changed) {
      toast.info("No changes detected");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateEvent(eventId, newFormData);

      if (result?.success) {
        toast.success(result?.message || "Event updated successfully! 🎉");
        setHasChanges(false);
        router.push(`/events/${eventId}`);
      } else {
        toast.error(result?.message || "Failed to update event");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

const handleDelete = async () => {
  if (!canEdit) return;

  setIsDeleting(true);
  try {
    const result = await deleteEvent(eventId);

    if (result?.success) {
      toast.success(result?.message || "Event deleted successfully");

      // ✅ refresh server components that read cached data
      router.refresh();

      // ✅ then go to the list page
      router.push("/host/dashboard/my-events");
    } else {
      toast.error(result?.message || "Failed to delete event");
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to delete event");
  } finally {
    setIsDeleting(false);
  }
};

  if (!event || !user) return null;
  if (!canEdit) return null;

  const statusOptions = [
    { value: "OPEN", label: "Open", color: "bg-green-500" },
    { value: "FULL", label: "Full", color: "bg-orange-500" },
    { value: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
    { value: "COMPLETED", label: "Completed", color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/30">
      {/* Header */}
      <div className="bg-linear-to-r from-primary via-purple-600 to-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.back()}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Edit Event</h1>
              <p className="text-lg text-white/90">Update your event details</p>
            </div>

            <Link href={`/events/${eventId}`}>
              <Button variant="secondary" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {hasChanges && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <p className="text-sm text-orange-800 font-medium">
                    You have unsaved changes. Don&apos;t forget to save!
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Event Information</CardTitle>
                    <CardDescription>Update the details of your event</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    ID: {String(eventId).slice(0, 8)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Image */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Event Cover Image
                      </label>

                      {imagePreview ? (
                        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-2 border-border">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-3 right-3 p-2 bg-destructive/90 text-white rounded-full hover:bg-destructive transition-all shadow-lg"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-64 md:h-80 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 hover:border-primary transition-all">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">
                                <span className="text-primary">Click to upload</span> new image
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG or WEBP (MAX. 5MB)
                              </p>
                            </div>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Title */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Event Title
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Weekend Hiking" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Status */}
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statusOptions.map((s) => (
                                  <SelectItem key={s.value} value={s.value}>
                                    <span className="flex items-center gap-2">
                                      <span className={`w-2 h-2 rounded-full ${s.color}`} />
                                      {s.label}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Date */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Date & Time
                            </FormLabel>
                            <FormControl>
                              <Input type="datetime-local" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Location
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Banani, Dhaka" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Type[] */}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories *</FormLabel>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {EVENT_TYPE.map((t) => {
                              const active = (field.value || []).includes(t);
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => {
                                    const current = field.value || [];
                                    const next = active
                                      ? current.filter((x) => x !== t)
                                      : [...current, t];
                                    field.onChange(next);
                                    setHasChanges(true);
                                  }}
                                  className={[
                                    "px-3 py-1.5 rounded-full text-xs border transition",
                                    active
                                      ? "bg-[#45aaa2] text-white border-[#45aaa2]"
                                      : "bg-background hover:bg-muted border-border text-foreground",
                                  ].join(" ")}
                                >
                                  {t.toLowerCase()}
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell people about your event..."
                              className="min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide detailed information to attract participants
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Capacity */}
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Capacity
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="10"
                                className="h-12"
                                value={field.value ?? 10}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Joining Fee */}
                      <FormField
                        control={form.control}
                        name="joiningFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Joining Fee (BDT)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                className="h-12"
                                value={field.value ?? 0}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>Set to 0 for free events</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4 pt-6 border-t">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push(`/events/${eventId}`)}
                          className="flex-1 h-12"
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          disabled={isSaving}
                          className="flex-1 h-12 gap-2 shadow-lg hover:shadow-xl transition-all"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Saving Changes...
                            </>
                          ) : (
                            <>
                              <Save className="h-5 w-5" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button" variant="destructive" className="w-full h-12 gap-2">
                            <Trash2 className="h-5 w-5" />
                            Delete Event
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="space-y-2">
                              <p>This action cannot be undone. This will permanently:</p>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Delete the event and all its data</li>
                                <li>Cancel all bookings</li>
                                <li>Remove from search results</li>
                              </ul>
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              disabled={isDeleting}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete Event"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
