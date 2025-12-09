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
        {required && <span className="text-error ml-1">*</span>}
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
        	className={`w-full p-3 border rounded-md ${
					error
						? "border-error"
						: "border-secondary-light focus:border-primary focus:outline-1"
				}
          ${inputClassName}
        `}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormInput;