const RadioFilter = ({ title, name, options, value, onChange }) => (
  <div className="mb-6">
    <span className="block text-gray-600 font-medium mb-2">{title}</span>
    {options.map((option) => {
      const id = `${name}-${option}`;
      return (
        <div key={option} className="flex items-center mb-1">
          <input
            id={id}
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-green-300"
          />
          <label htmlFor={id} className="text-gray-700 cursor-pointer">
            {option}
          </label>
        </div>
      );
    })}
  </div>
);

export default RadioFilter;
