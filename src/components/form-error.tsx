import React from "react";

interface IFormError {
  errorMessage: string;
}

const FormError: React.FC<IFormError> = ({ errorMessage }) => (
  <p className="text-red-500 text-xs italic mb-3">{errorMessage}</p>
);

export default FormError;
