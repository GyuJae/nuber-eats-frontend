import React from "react";
import {
  DeepMap,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { UserRole } from "../__generated__/globalTypes";
import Input from "./input";
import Select from "./select";
import Title from "./titls";

interface IForm {
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  register: UseFormRegister<any>;
  errors: DeepMap<any, any>;
  loading: boolean;
  formName: string;
  inputList: string[];
}

const Form: React.FC<IForm> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
  formName,
  inputList,
}) => (
  <div className="w-screen flex flex-col justify-center items-center">
    <Title />
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {inputList.map((inputName, index) =>
          inputName === "role" ? (
            <Select
              key={index}
              inputName={inputName}
              register={register}
              options={UserRole}
            />
          ) : (
            <Input
              key={index}
              inputName={inputName}
              register={register}
              errors={errors}
              placeholder={inputName === "password" ? "*****" : inputName}
            />
          )
        )}
        <div className="flex items-center justify-center">
          <button
            className="w-full transition duration-500 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? "Loading..." : formName.toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Form;
