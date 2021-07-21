import React from "react";
import { DeepMap, UseFormRegister } from "react-hook-form";
import FormError from "./form-error";

interface IInput {
  inputName: string;
  register: UseFormRegister<any>;
  errors: DeepMap<any, any>;
  placeholder: string;
  required: boolean;
}

const regex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Input: React.FC<IInput> = ({
  inputName,
  register,
  errors,
  placeholder,
  required,
}) => {
  const errorsList = Object.keys(errors);
  let errorMessage;
  if (errorsList.includes(inputName)) {
    errorMessage =
      errors[inputName].type === "required"
        ? `${inputName} is required`
        : `${inputName} ${errors[inputName].type} is wrong`;
  }

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-3"
        id={inputName}
      >
        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
        id={inputName}
        type={inputName === "password" ? "password" : undefined}
        placeholder={placeholder}
        {...register(inputName, {
          ...(required && { required: true }),
          ...(inputName === "email" && { pattern: regex }),
        })}
      />
      {errorMessage && <FormError errorMessage={errorMessage} />}
    </div>
  );
};

export default Input;
