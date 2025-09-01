import { useField } from "formik";
import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

function Custominput({ label, ...props }: CustomInputProps) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          meta.touched && meta.error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
            : "border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-300"
        } placeholder-gray-400 text-gray-900`}
      />
      {meta.touched && meta.error && (
        <div className="flex items-center mt-2">
          <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-600">{meta.error}</p>
        </div>
      )}
    </div>
  );
}

export default Custominput;
