import { useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../components/form";
import FormError from "../../components/form-error";
import EDITPROFILE_MUTATION from "../../operations/mutations/edit-profile";
import useMe from "../../operations/queries/me";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../../__generated__/EditProfileMutation";

interface IEditProfile {
  email?: string;
  password?: string;
}

const EditProfile = () => {
  const { data: userData, refetch } = useMe();
  const onCompleted = async (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      await refetch();
    }
  };
  const [editProfile, { loading, data: editProfileResults }] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDITPROFILE_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IEditProfile>({
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit: SubmitHandler<IEditProfile> = (data) => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        editProfileInput: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8 lg:mt-28">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
        formName="edit profile"
        inputList={["email", "password"]}
        required={false}
      ></Form>
      {editProfileResults?.editProfile.error && (
        <FormError errorMessage={editProfileResults?.editProfile.error} />
      )}
    </div>
  );
};

export default EditProfile;
