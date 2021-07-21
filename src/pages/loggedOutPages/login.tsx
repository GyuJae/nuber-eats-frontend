import React from "react";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../components/form";
import LOGIN_MUTATION from "../../operations/mutations/login";

import { Link } from "react-router-dom";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../../__generated__/LoginMutation";
import FormError from "../../components/form-error";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../contants";

interface ILoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [login, { loading, data: LoginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = () => {
    if (!loading) {
      const { email, password } = getValues();
      login({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 lg:mt-28">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
        formName="login"
        inputList={["email", "password"]}
        required={true}
      />
      {LoginMutationResult?.login?.error && (
        <FormError errorMessage={LoginMutationResult.login.error} />
      )}
      <div className="w-full flex justify-center items-center mr-2">
        <span className="mr-2">New to Nuber?{"   "}</span>
        <Link to="/create-account" className="text-green-700 hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
