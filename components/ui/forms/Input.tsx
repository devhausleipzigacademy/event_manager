import clsx from "clsx";
import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends Input {
  id: string;
  label: string;
  error: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 flex-grow">
        <label
          htmlFor={id}
          className="text-xs mx-6 text-neutral-400 font-semibold capitalize"
        >
          {label}
        </label>
        <input
          ref={ref}
          className="border-solid border-gray border-2 px-6 py-2 text-sm text-neutral-500 rounded-md w-full focus:border-primary focus:outline-none"
          {...props}
        />
        {error?.message && (
          <small className="text-red-500">{error.message}</small>
        )}
      </div>
    );
  }
);

export default Input;
