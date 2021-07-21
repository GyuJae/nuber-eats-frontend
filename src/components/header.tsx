// import { useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaBars } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ISearchRestaurants {
  query: string;
}

const Header = () => {
  const onSubmit: SubmitHandler<ISearchRestaurants> = (data) =>
    console.log(data);

  const {
    register,
    handleSubmit,
    // getValues,
    // formState: { errors },
  } = useForm<ISearchRestaurants>();
  return (
    <div className="flex h-20 w-full justify-evenly  items-center border-b-2 border-gray-200  ">
      <FaBars className="" />
      <Link to="/">
        <div className="text-3xl font-semibold">
          <span>Uber </span>
          <span className="text-green-500">Eats</span>
        </div>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <input
          type="text"
          placeholder="Enter restaurants name"
          {...register("query")}
          className="mr-2 px-20 py-1 leading-tight shadow-outline"
        />
      </form>
      <Link to="/edit-profile">
        <FaUserAlt />
      </Link>
    </div>
  );
};

export default Header;
