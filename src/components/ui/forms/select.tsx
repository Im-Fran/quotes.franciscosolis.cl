import {ComponentPropsWithoutRef, ElementRef, forwardRef} from "react";
import {Root, Group, Value, Trigger, Content, Viewport, Portal, Icon, Label, Item, ItemIndicator, ItemText, Separator} from "@radix-ui/react-select"
import { Check, ChevronDown } from 'lucide-react'

import { clsx } from "clsx"

const Select = Root
const SelectGroup = Group
const SelectValue = Value
const SelectTrigger = forwardRef<ElementRef<typeof Trigger>, ComponentPropsWithoutRef<typeof Trigger>>(({ className, children, ...props }, ref) => <Trigger ref={ref} className={clsx("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}{...props}>
  {children}
  <Icon asChild>
    <ChevronDown className="h-4 w-4 opacity-50" />
  </Icon>
</Trigger>)

const SelectContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(({ className, children, position = "popper", ...props }, ref) => <Portal>
  <Content ref={ref} className={clsx("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-neutral-800 text-neutral-50 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className)} position={position}{...props} style={{ maxHeight: '200px', overflowY: 'auto' }}>
    <Viewport className={clsx("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
      {children}
    </Viewport>
  </Content>
</Portal>)

const SelectLabel = forwardRef<ElementRef<typeof Label>, ComponentPropsWithoutRef<typeof Label>>(({ className, ...props }, ref) => <Label
  ref={ref}
  className={clsx("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
  {...props}
/>)

const SelectItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(({ className, children, ...props }, ref) => <Item
  ref={ref}
  className={clsx(
    "relative flex w-full hover:bg-neutral-700 cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...props}
>
  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <ItemIndicator>
      <Check className="h-4 w-4" />
    </ItemIndicator>
  </span>

  <ItemText>{children}</ItemText>
</Item>)

const SelectSeparator = forwardRef<ElementRef<typeof Separator>, ComponentPropsWithoutRef<typeof Separator>>(({ className, ...props }, ref) => <Separator
  ref={ref}
  className={clsx("-mx-1 my-1 h-px bg-muted", className)}
  {...props}
/>)

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}