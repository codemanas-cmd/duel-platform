// components/ui/badge.tsx
import React from "react"
import { cn } from "../lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline"
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const baseStyles = variant === "outline"
    ? "border px-2 py-1 rounded-full text-sm font-medium"
    : "bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-medium"

  return <span className={cn(baseStyles, className)} {...props} />
}
