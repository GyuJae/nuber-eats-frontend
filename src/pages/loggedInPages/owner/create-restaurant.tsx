import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Form from "../../../components/form";
import FormError from "../../../components/form-error";
import CREATERESTAURANT_MUTATION from "../../../operations/mutations/create-restaurant";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "../../../__generated__/CreateRestaurantMutation";

interface ICreateRestaurant {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

const CreateRestaurant = () => {
  const history = useHistory();
  const onCompleted = () => {
    history.go(0);
    history.replace("/");
  };
  const [createRestaurantMutation, { loading, data }] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATERESTAURANT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ICreateRestaurant>();

  const onSubmit: SubmitHandler<ICreateRestaurant> = () => {
    if (!loading) {
      const { name, categoryName, address, coverImg } = getValues();
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8 lg:mt-28">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
        formName="Create Restaurant"
        inputList={["name", "coverImg", "address", "categoryName"]}
        required={true}
      />
      {data?.createRestaurant.error && (
        <FormError errorMessage={data?.createRestaurant.error} />
      )}
    </div>
  );
};

export default CreateRestaurant;
