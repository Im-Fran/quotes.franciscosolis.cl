import {FC, LabelHTMLAttributes} from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string
}

export const Label: FC<LabelProps> = ({ className = '', ...props }) => <label
  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
  {...props}
/>