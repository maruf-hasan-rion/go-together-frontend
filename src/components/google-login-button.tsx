"use client";

import { googleSignIn } from "@/services/auth/googleAuth";
import Script from "next/script";
import { useRef, useState } from "react";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
  }
}

const GoogleLoginButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleCredential = async (response: { credential?: string }) => {
    if (!response.credential) return;

    setIsSigningIn(true);
    const result = await googleSignIn(response.credential);
    if (result && !result.success) {
      toast.error(result.message);
      setIsSigningIn(false);
    }
  };

  const initialize = () => {
    if (!clientId || !window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredential,
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: 320,
      text: "continue_with",
    });
  };

  if (!clientId) return null;

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initialize}
      />
      <div className="flex flex-col items-center gap-2">
        <div ref={buttonRef} />
        {isSigningIn && (
          <p className="text-sm text-gray-500">Signing in with Google...</p>
        )}
      </div>
    </>
  );
};

export default GoogleLoginButton;
