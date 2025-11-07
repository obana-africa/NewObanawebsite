// components/ui/form-input.tsx - Updated to support step prop
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface FormInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  error?: string;
  required?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  step?: string | number; 
  min?: string | number;
  max?: string | number; 
  className?: string;
  inputClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder = "",
  type = "text",
  error,
  required = false,
  disabled = false,
  register,
  step,
  min,
  max,
  className = "",
  inputClassName = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        {...register}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-300"}
          ${inputClassName}
        `}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;