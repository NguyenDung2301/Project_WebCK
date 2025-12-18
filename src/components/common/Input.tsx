
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'admin' | 'auth';
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  variant = 'admin', 
  className = '', 
  error,
  id,
  ...props 
}, ref) => {
  
  const baseStyles = "block w-full transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none";
  
  const variants = {
    // Admin: changed from rounded-lg to rounded-2xl
    admin: "rounded-2xl border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm px-4 py-2.5",
    // Auth: kept highly rounded
    auth: "px-6 py-4 border border-gray-300 rounded-[30px] focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
  };

  const labelStyles = "block text-sm font-medium text-gray-700 mb-1 ml-1"; // Added ml-1 for alignment with rounded corners

  // Applied w-full to wrapper to ensure inputs fill their containers consistently
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={id || props.name} className={labelStyles}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id || props.name}
        className={cn(baseStyles, variants[variant], error && "border-red-500 focus:border-red-500 focus:ring-red-100")}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600 ml-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
