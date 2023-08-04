"use client";
import React, { forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { FieldError } from "react-hook-form";

type TextArea = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
interface TextAreaProps extends TextArea {
  label: string;
  id: string;
  error?: FieldError | undefined;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          className="text-xs mx-6 text-neutral-400 font-semibold capitalize"
          htmlFor={id}
        >
          {label}
        </label>
        <textarea
          {...props}
          ref={ref}
          className="min-h-[100px] resize-none text-neutral-500 border-solid border-gray border-2 px-6 py-2 text-sm rounded-md w-full focus:border-primary focus:outline-none"
        />
        {error?.message && (
          <small className="text-red-500">{error.message}</small>
        )}
      </div>
    );
  }
);

export default TextArea;
