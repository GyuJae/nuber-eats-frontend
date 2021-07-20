import React from "react";
import { UseFormRegister } from "react-hook-form";

interface ISelect {
  register: UseFormRegister<any>;
  options: Object;
  inputName: string;
}

const Select: React.FC<ISelect> = ({ register, options, inputName }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-3"
        id={inputName}
      >
        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
        {...register(inputName)}
      >
        {Object.keys(options).map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
