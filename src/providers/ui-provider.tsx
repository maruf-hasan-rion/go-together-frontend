"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "gotogether-ui";
const listeners = new Set<() => void>();
let cached: boolean | undefined;

function readCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  if (cached === undefined) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      cached = Boolean(raw ? JSON.parse(raw)?.sidebarCollapsed : false);
    } catch {
      cached = false;
    }
  }
  return cached;
}

function writeCollapsed(value: boolean) {
  cached = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ sidebarCollapsed: value }));
  } catch {
    /* storage unavailable — ignore */
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type UiContextValue = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
};

const UiContext = createContext<UiContextValue | null>(null);

/**
 * Global client UI state via React Context. The persisted sidebar preference
 * uses an external store so it is hydration-safe (server snapshot = false)
 * without a setState-in-effect.
 */
export function UiProvider({ children }: { children: ReactNode }) {
  const sidebarCollapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);

  const toggleSidebar = useCallback(() => writeCollapsed(!readCollapsed()), []);

  const value = useMemo<UiContextValue>(
    () => ({ sidebarCollapsed, toggleSidebar, setSidebarCollapsed: writeCollapsed }),
    [sidebarCollapsed, toggleSidebar],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within <UiProvider>");
  return context;
}
