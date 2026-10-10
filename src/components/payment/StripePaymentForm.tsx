// components/payment/StripePaymentForm.tsx
"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface StripePaymentFormProps {
  paymentIntentId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function StripePaymentForm({
  paymentIntentId,
  onSuccess,
  onClose,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/my-bookings`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    // ✅ Stripe payment succeeded, now confirm in backend
    setIsConfirming(true);
    try {
      const res = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result?.success) {
        throw new Error(result?.message || "Failed to update booking status");
      }

      toast.success("Payment successful!");
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment confirmed but failed to update booking");
    } finally {
      setIsConfirming(false);
      setIsProcessing(false);
    }
  };

  const disabled = isProcessing || isConfirming || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>

        <Button type="submit" className="flex-1" disabled={disabled}>
          {isProcessing || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isConfirming ? "Confirming..." : "Processing..."}
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>
    </form>
  );
}
