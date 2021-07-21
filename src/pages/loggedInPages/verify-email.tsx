import { gql, useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { client } from "../../apollo";
import Form from "../../components/form";
import FormError from "../../components/form-error";
import VERIFYEMAIL_MUTATION from "../../operations/mutations/verify-email";
import useMe from "../../operations/queries/me";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../__generated__/VerifyEmailMutation";

interface IVerifyEmail {
  code: string;
}

const VerifyEmail = () => {
  const { data: userData } = useMe();
  const onCompleted = (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifyUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
    }
  };
  const [verifyEmail, { loading, data: VerifyEmailResults }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFYEMAIL_MUTATION, {
    onCompleted,
  });
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<IVerifyEmail>();

  const onSubmit: SubmitHandler<IVerifyEmail> = () => {
    if (!loading) {
      const { code } = getValues();
      verifyEmail({
        variables: {
          verifyEmailInput: {
            code,
          },
        },
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10 lg:mt-28">
      <Form
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        loading={loading}
        errors={errors}
        formName="Verify Email"
        inputList={["code"]}
        required={true}
      />
      {VerifyEmailResults?.verifyEmail.error && (
        <FormError errorMessage={VerifyEmailResults.verifyEmail.error} />
      )}
    </div>
  );
};

export default VerifyEmail;
