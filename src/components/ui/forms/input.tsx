import {FC, InputHTMLAttributes} from "react";
import {clsx} from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const Input: FC<InputProps> = ({ className = '', ...props }) => <input className={clsx(['placeholder:text-neutral-500 dark:placeholder:text-neutral-300 w-full px-3 py-2 text-gray-700 bg-neutral-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-neutral-50 dark:focus:ring-indigo-500', className])}
  {...props}
/>
