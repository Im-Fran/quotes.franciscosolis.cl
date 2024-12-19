import { FC, InputHTMLAttributes } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ className = '', ...props }) => (
  <input
    type="checkbox"
    className={`form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ${className}`}
    {...props}
  />
);