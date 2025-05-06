// components/ui/avatar.tsx
import React from "react"
import { cn } from "../lib/utils"

export function Avatar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-full overflow-hidden", className)}>{children}</div>
}

export function AvatarFallback({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center w-full h-full bg-gray-300 text-white", className)}>
      {children}
    </div>
  )
}
