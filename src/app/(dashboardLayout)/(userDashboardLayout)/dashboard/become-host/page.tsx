import BecomeHost from "@/components/becomeHost";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BecomeHostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BecomeHost />
    </Suspense>
  );
}



