import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = "", ...props }, ref) => {
    const widthClass = fullWidth ? "w-full" : "";
    const errorClass = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-300 focus:ring-teal-500 focus:border-teal-500";

    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-2.5 bg-white border ${errorClass} rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 ${widthClass} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;