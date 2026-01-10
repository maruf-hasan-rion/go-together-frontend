"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventFormDialog from "./EventFormDialog";

export default function AddEventButton() {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        window.location.reload();
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="w-full md:w-auto mb-6 px-5 py-2.5 bg-[#45aaa2] text-white font-medium text-sm rounded-lg hover:bg-[#3c8f88] transition-colors duration-200 flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Add Event
            </Button>

            <EventFormDialog
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}
