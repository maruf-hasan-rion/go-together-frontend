"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { UiProvider } from "./ui-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UiProvider>{children}</UiProvider>
    </QueryProvider>
  );
}
