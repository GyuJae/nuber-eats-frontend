// import { useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaBars } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

interface ISearchRestaurants {
  term: string;
}

const Header = () => {
  const {
    register,
    handleSubmit,
    getValues,
    // formState: { errors },
  } = useForm<ISearchRestaurants>();
  const history = useHistory();

  const onSubmit: SubmitHandler<ISearchRestaurants> = () => {
    const { term } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${term}`,
    });
  };

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
          {...register("term")}
          className="mr-2 border-b-2 bg-gray-100 px-36 py-2 outline-none leading-tight shadow-outline"
        />
      </form>
      <Link to="/edit-profile">
        <FaUserAlt />
      </Link>
    </div>
  );
};

export default Header;
