"use client";

import SpinnerLoader from "@/components/shared/SpinnerLoader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* 404 Text */}
        <div>
          <h1 className="text-6xl font-bold text-[#45aaa2] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        </div>

        {/* Message */}
        <p className="text-muted-foreground text-base">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            asChild
            className="flex-1 gap-2 bg-[#45aaa2] hover:bg-[#3c8f88]"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


export default function NotFound() {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <NotFoundContent />
    </Suspense>
  )
}