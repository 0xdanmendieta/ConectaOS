"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "subtle";
type Size = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-purple to-purple-deep text-white shadow-[0_4px_14px_rgba(109,30,212,0.28)] hover:shadow-[0_8px_22px_rgba(109,30,212,0.4)] hover:-translate-y-[1px]",
  secondary:
    "bg-white text-graphite border border-line hover:border-lavender hover:bg-lavender-bg/50 shadow-sm",
  ghost: "text-muted hover:text-purple hover:bg-lavender-bg",
  subtle: "bg-lavender-bg text-purple-deep hover:bg-lavender-light",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
