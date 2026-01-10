"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Event} from "@/types/event.interface";
import { useState } from "react";

interface UpdateEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Event | null;
    onSubmit: (formData: { title: string; description: string; location: string }) => Promise<void>;
    isLoading?: boolean;
}

export default function UpdateEventModal({
    open,
    onOpenChange,
    event,
    onSubmit,
    isLoading = false,
}: UpdateEventModalProps) {
    const [formData, setFormData] = useState({
        title: event?.title || "",
        description: event?.description || "",
        location: event?.location || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        await onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData({
            title: event?.title|| "",
            description: event?.description || "",
            location: event?.location || "",
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">
                        Update Event
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-1">
                        Modify your event details below. Click submit to save changes.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Event Title
                        </label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter event title"
                            disabled={isLoading}
                            className="text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Location
                        </label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter event location"
                            disabled={isLoading}
                            className="text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Description
                        </label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            disabled={isLoading}
                            className="text-sm resize-none"
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="text-sm font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="text-sm font-medium text-white bg-[#45aaa2] hover:bg-[#3c8f88] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
