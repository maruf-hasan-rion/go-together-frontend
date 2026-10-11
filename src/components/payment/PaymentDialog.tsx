"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Calendar,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// ✅ rename imports to avoid conflict
import {
  createPaymentIntent as createPaymentIntentServer,
  confirmPayment as confirmPaymentServer,
} from "@/services/payment/payment";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Stripe Payment Form Component
function StripePaymentForm({
  paymentIntentId,
  amount,
  onSuccess,
  onClose,
}: {
  paymentIntentId: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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

    // ✅ Stripe succeeded → confirm backend
    setIsConfirming(true);
    try {
      const result = await confirmPaymentServer(paymentIntentId);

      if (!result?.success) {
        toast.error(result?.message || "Booking update failed");
        return;
      }

      toast.success("Payment successful! 🎉");
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking update failed");
    } finally {
      setIsConfirming(false);
      setIsProcessing(false);
    }
  };

  const disabled = isProcessing || isConfirming || !stripe || !elements || !paymentReady;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Element with loading indicator */}
      <div className="relative">
        <PaymentElement
          onReady={() => setPaymentReady(true)}
          onLoadError={(event) => {
            setLoadError(event.error?.message ?? "Unable to load the payment form");
          }}
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
        />
        {loadError ? (
          <div className="absolute inset-0 rounded-lg bg-background/95 flex items-center justify-center p-4">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">
                Payment form failed to load
              </p>
              <p className="text-xs text-muted-foreground">{loadError}</p>
            </div>
          </div>
        ) : !paymentReady ? (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading payment form...</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <Shield className="h-4 w-4 text-green-600" />
        <p className="text-xs text-green-800 font-medium">
          Secured by 256-bit SSL encryption
        </p>
      </div>

      {/* Amount Summary */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
        <span className="text-sm font-medium">Total Amount</span>
        <span className="text-2xl font-bold text-primary">${amount.toLocaleString()}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={disabled}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={disabled}
          className="w-full sm:flex-1 gap-2 order-1 sm:order-2 shadow-lg hover:shadow-xl transition-all"
        >
          {disabled ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isConfirming ? "Confirming..." : "Processing..."}
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Pay ${amount.toLocaleString()}
            </>
          )}
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span>Instant Confirmation</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span>Refund Available</span>
        </div>
      </div>
    </form>
  );
}

// Main PaymentDialog
interface PaymentDialogProps {
  bookingId: string;
  amount: number;
  eventName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PaymentDialog({
  bookingId,
  amount,
  eventName,
  open,
  onOpenChange,
  onSuccess,
}: PaymentDialogProps) {
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);

  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [isIntentError, setIsIntentError] = useState(false);
  const [isDemoConfirming, setIsDemoConfirming] = useState(false);

  const handleDialogChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        setPaymentIntentId("");
        setClientSecret("");
        setIsDemoMode(false);
        setIsCreatingIntent(false);
        setIsIntentError(false);
        setIsDemoConfirming(false);
      }
      onOpenChange(isOpen);
    },
    [onOpenChange]
  );

  useEffect(() => {
    if (open && !paymentIntentId && !isCreatingIntent) {
      (async () => {
        setIsCreatingIntent(true);
        setIsIntentError(false);

        try {
          const result = await createPaymentIntentServer(bookingId);

          if (!result?.success) {
            throw new Error(result?.message || "Failed to setup payment");
          }

          // expect: result.data = { paymentIntentId, clientSecret }
          const data = result.data;

          setPaymentIntentId(data.paymentIntentId);
          setClientSecret(data.clientSecret || "");
          setIsDemoMode(String(data.paymentIntentId).startsWith("demo_pi_"));
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Failed to setup payment";
          toast.error(msg);
          setIsIntentError(true);

          if (!msg.includes("already exists")) {
            handleDialogChange(false);
          }
        } finally {
          setIsCreatingIntent(false);
        }
      })();
    }
  }, [open, bookingId, paymentIntentId, isCreatingIntent, handleDialogChange]);

  const handleDemoConfirm = async () => {
    if (!paymentIntentId) return;

    setIsDemoConfirming(true);
    try {
      const result = await confirmPaymentServer(paymentIntentId);

      if (!result?.success) {
        toast.error(result?.message || "Failed to confirm demo payment");
        return;
      }

      toast.success("Joined successfully! (Demo) 🎉");
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to confirm demo payment");
    } finally {
      setIsDemoConfirming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center mx-auto shadow-lg">
            <CreditCard className="h-7 w-7 text-white" />
          </div>

          <DialogTitle className="text-2xl text-center">Complete Your Booking</DialogTitle>
          <DialogDescription className="text-center">
            You&apos;re joining{" "}
            <span className="font-semibold text-foreground">{eventName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center p-6 bg-linear-to-br from-primary/5 to-purple-500/5 rounded-2xl border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Amount
            </p>
            <p className="text-5xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ${amount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              One-time payment • No hidden fees
            </p>
          </div>

          {isDemoMode && (
            <div className="relative overflow-hidden rounded-xl border border-yellow-200 bg-linear-to-br from-yellow-50 to-orange-50 p-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl" />
              <div className="relative flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-900 mb-1">Demo Mode Active</p>
                  <p className="text-xs text-yellow-700">This is a test payment. No real charges will be made.</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-200 text-yellow-900">
                  TEST
                </Badge>
              </div>
            </div>
          )}

          {isCreatingIntent ? (
            <div className="flex flex-col items-center py-12">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <CreditCard className="absolute inset-0 m-auto h-6 w-6 text-primary" />
              </div>
              <p className="mt-6 text-sm font-medium text-foreground">Setting up secure payment...</p>
              <p className="text-xs text-muted-foreground mt-1">This will only take a moment</p>
            </div>
          ) : isDemoMode ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Demo Payment Instructions</p>
                  <p className="text-xs">
                    Click the button below to simulate a successful payment. Your booking will be confirmed instantly.
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 shadow-lg hover:shadow-xl transition-all"
                onClick={handleDemoConfirm}
                disabled={isDemoConfirming}
              >
                {isDemoConfirming ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing Demo Payment...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Confirm Demo Payment
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleDialogChange(false)}
                disabled={isDemoConfirming}
              >
                Cancel
              </Button>
            </div>
          ) : clientSecret && paymentIntentId && stripePromise ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <StripePaymentForm
                paymentIntentId={paymentIntentId}
                amount={amount}
                onSuccess={onSuccess}
                onClose={() => handleDialogChange(false)}
              />
            </Elements>
          ) : isIntentError ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <p className="font-medium text-foreground mb-2">Payment Setup Failed</p>
              <p className="text-sm text-muted-foreground mb-6">
                We couldn&apos;t initialize the payment. Please try again.
              </p>
              <Button onClick={() => handleDialogChange(false)} variant="outline">
                Close
              </Button>
            </div>
          ) : clientSecret && !stripePromise ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
              <p className="font-medium text-foreground mb-2">Payments are not configured</p>
              <p className="text-sm text-muted-foreground mb-6">
                Set <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to the publishable key that
                matches the backend&apos;s Stripe secret key.
              </p>
              <Button onClick={() => handleDialogChange(false)} variant="outline">
                Close
              </Button>
            </div>
          ) : null}

          {!isDemoMode && !isCreatingIntent && clientSecret && (
            <div className="text-center pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secured and powered by</span>
                <span className="font-bold text-[#635BFF]">Stripe</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
