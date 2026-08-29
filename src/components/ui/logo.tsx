import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("flex items-center gap-2 group", className)}
      {...props}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-bold text-lg leading-none transition-transform group-hover:scale-105">
        B
      </div>
      <span className="font-heading font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
        BlazeByte <span className="font-normal text-neutral-500 dark:text-neutral-400">Studio</span>
      </span>
    </Link>
  )
}
