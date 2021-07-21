import React from "react";
import { FaSpinner } from "react-icons/fa";
const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="flex font-medium animate-spin text-4xl tracking-wide">
        <FaSpinner />
      </span>
    </div>
  );
};

export default Loading;
