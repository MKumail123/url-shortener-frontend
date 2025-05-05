import React from 'react';

const Input = ({ 
  id, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  className = '', 
  error = false,
  icon,
  inputClassName = '' 
}) => {
  return (
    <div className="relative">
      {/* Icon container with updated colors */}
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {React.cloneElement(icon, {
            className: `h-5 w-5 ${error ? 'text-red-400' : 'text-blue-400'}`
          })}
        </div>
      )}

      {/* Input field with dark theme styling */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-3 ${icon ? 'pl-10' : ''}
          bg-[#111827] 
          border ${error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-blue-900/30 focus:border-blue-500'
          }
          rounded-xl
          text-gray-200 
          placeholder-gray-500
          focus:outline-none 
          focus:ring-1 
          ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
          transition-colors
          duration-200
          ${className}
        `}
      />

      {/* Error state ripple effect */}
      {error && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 rounded-xl bg-red-500/10 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default Input;