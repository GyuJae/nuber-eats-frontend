import { useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../../__generated__/globalTypes";
import Form from "../../components/form";
import CREATEACCOUNT_MUTATION from "../../operations/mutations/create-account";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../../__generated__/CreateAccountMutation";
import FormError from "../../components/form-error";

interface ICreateAccountInputs {
  email: string;
  password: string;
  role: UserRole;
}

const CreateAccount = () => {
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/login");
    }
  };
  const [createAccount, { loading, data: CreateAccountMutationResult }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATEACCOUNT_MUTATION,
      {
        onCompleted,
      }
    );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ICreateAccountInputs>();

  const onSubmit: SubmitHandler<ICreateAccountInputs> = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccount({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
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
        formName="Create Account"
        inputList={["email", "password", "role"]}
        required={true}
      />
      {CreateAccountMutationResult?.createAccount?.error && (
        <FormError
          errorMessage={CreateAccountMutationResult.createAccount.error}
        />
      )}
      <div className="w-full flex justify-center items-center mr-2 pb-10">
        <span className="mr-2">Already use Uber? {"   "}</span>
        <Link to="/" className="text-green-700 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
