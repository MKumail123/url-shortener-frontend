const Input = ({ id, name, type = 'text', value, onChange, placeholder, required = false, className = '', error = false }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`
        w-full px-4 py-3 rounded-lg 
        border-2 ${error ? 'border-red-300' : 'border-gray-200'} 
        bg-white
        placeholder-gray-400
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition duration-150 ease-in-out
        ${className}
      `}
    />
  );
};

export default Input;