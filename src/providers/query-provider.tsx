"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
    // Surface every query/mutation failure as a toast — satisfies the
    // "API failures must notify the user" requirement in one place.
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Failed to load data");
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Action failed");
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(getQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
