import {forwardRef, TextareaHTMLAttributes} from "react"
import clsx from "clsx"

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...props }, ref) => <textarea className={clsx("flex min-h-[80px] border-0 border-transparent w-full rounded-md bg-neutral-50 dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 text-neutral-700 dark:text-neutral-50", className)} ref={ref}{...props}/>)