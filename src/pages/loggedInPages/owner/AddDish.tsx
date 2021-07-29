import { useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import FormError from "../../../components/form-error";
import Title from "../../../components/titls";
import CREATE_DISH_MUTATION from "../../../operations/mutations/add-dish";
import MY_RESTAURANT_QUERY from "../../../operations/queries/my-restaurant";
import {
  createDish,
  createDishVariables,
} from "../../../__generated__/createDish";

interface IParams {
  id: string;
}

interface IForms {
  name: string;
  price: number;
  description: string;
  options: {
    name: string;
    extra: number;
  }[];
}

const AddDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +id,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IForms>({
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });
  const onSubmit: SubmitHandler<IForms> = () => {
    const { name, description, price, options } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +id,
          options,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="w-screen flex flex-col justify-center items-center mt-10">
      <Title />
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-3"
              id={"name"}
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
              id={"name"}
              type={"text"}
              placeholder={"Name"}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <FormError errorMessage={errors.name.message as string} />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-3"
              id={"price"}
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
              id={"price"}
              type={"number"}
              placeholder={"Price"}
              min={0}
              {...register("price", {
                required: true,
              })}
            />
            {errors.price && (
              <FormError errorMessage={errors.price.message as string} />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-3"
              id={"description"}
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
              id={"description"}
              type={"text"}
              placeholder={"Description"}
              min={0}
              {...register("description", {
                required: true,
              })}
            />
            {errors.description && (
              <FormError errorMessage={errors.description.message as string} />
            )}
          </div>
          <div className="mb-4 ">
            <button
              className="block transition duration-500 hover:bg-gray-900 text-white px-2 py-1  bg-gray-700 text-sm font-bold mb-3 rounded
              leading-tight outline-none shadow-outline"
              type="button"
              onClick={() =>
                append({
                  name: "",
                  extra: 0,
                })
              }
            >
              APPEND OPTION
            </button>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex justify-center items-center mb-3"
                >
                  <section
                    className={"section flex justify-between items-center"}
                    key={field.id}
                  >
                    <input
                      type="text"
                      placeholder="name"
                      {...register(`options.${index}.name` as const, {
                        required: true,
                      })}
                      className={
                        errors?.options?.[index]?.name
                          ? "error mr-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
                          : "mr-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
                      }
                    />
                    <input
                      type="number"
                      placeholder="extra"
                      {...register(`options.${index}.extra` as const, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className={
                        errors?.options?.[index]?.extra
                          ? "mr-2 error shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
                          : "mr-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none shadow-outline"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-1/2 transition duration-500 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      DELETE
                    </button>
                  </section>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center">
            <button
              className="w-full transition duration-500 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="flex font-medium animate-spin text-2xl tracking-wide">
                    <FaSpinner />
                  </span>
                </div>
              ) : (
                <span>ADD DISH</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDish;
