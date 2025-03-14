import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-neutral-950 flex flex-col gap-6 rounded-xl border border-neutral-200 py-6 shadow-sm dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-neutral-500 text-sm dark:text-neutral-400", className)}
      {...props}
    />
  )
}

<<<<<<< HEAD
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

=======
>>>>>>> c01b0c1407af7d1edbd27b5b62ed536771a3917f
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
<<<<<<< HEAD
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
=======
      className={cn("flex items-center px-6", className)}
>>>>>>> c01b0c1407af7d1edbd27b5b62ed536771a3917f
      {...props}
    />
  )
}

<<<<<<< HEAD
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
=======
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> c01b0c1407af7d1edbd27b5b62ed536771a3917f
