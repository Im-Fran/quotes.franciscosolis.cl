import {ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLAttributes} from "react";
import {Root, Trigger, Portal, Overlay, Content, Close, Title, Description} from "@radix-ui/react-dialog";
import { X } from 'lucide-react'

import { clsx } from "clsx"

const Dialog = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogOverlay = forwardRef<ElementRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(({ className, ...props }, ref) => <Overlay
  ref={ref}
  className={clsx(
    "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    className
  )}
  {...props}
/>)

const DialogContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(({ className, children, ...props }, ref) => <DialogPortal>
  <DialogOverlay />
  <Content ref={ref} className={clsx(className, "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-neutral-9800 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full")} {...props}>
    {children}
    <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Close>
  </Content>
</DialogPortal>)

const DialogHeader = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => <div className={clsx("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}/>
const DialogFooter = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => <div className={clsx("flex flex-row-reverse items-center justify-end space-x-2", className)} {...props}/>
const DialogTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(({ className, ...props }, ref) => <Title ref={ref} className={clsx("text-lg font-semibold leading-none tracking-tight", className)} {...props}/>)
const DialogDescription = forwardRef<ElementRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(({ className, ...props }, ref) => <Description ref={ref} className={clsx("text-sm text-muted-foreground", className)}{...props}/>)

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}