"use client";

import { ClipLoader } from "react-spinners";
import { Activity } from "lucide-react";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  showIcon?: boolean;
  fullScreen?: boolean;
  compact?: boolean;
}

const SIZE_MAP = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 100,
} as const;

export default function SpinnerLoader({
  text = "Loading....",
  size = "md",
  className = "",
  animated = true,
  showIcon = false,
  fullScreen = true,
  compact = false,
}: LoaderProps) {
  const spinnerSize = SIZE_MAP[size];
  const containerClass = fullScreen ? "min-h-screen" : "py-12";
  const gapClass = compact ? "gap-2" : "gap-4";

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerClass} ${gapClass} ${className}`}
    >
      {/* Spinner */}
      <ClipLoader
        size={spinnerSize}
        color="#45aaa2"
        speedMultiplier={animated ? 1 : 0}
      />

      {/* Optional icon instead of spinner */}
      {showIcon && (
        <Activity className="text-[#45aaa2] animate-pulse" size={spinnerSize - 10} />
      )}

      {/* Text */}
      {text && (
        <p className={`font-medium text-white text-center ${compact ? "text-lg" : "text-2xl"}`}>
          {text}
        </p>
      )}
    </div>
  );
}
