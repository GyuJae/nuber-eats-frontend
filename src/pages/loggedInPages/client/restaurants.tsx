import { useQuery } from "@apollo/client";
import RESTAURANTS_QUERY from "../../../operations/queries/restaurants";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../../__generated__/restaurantsPageQuery";

const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-3/12 outline-none"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <>
          <div className="flex justify-center items-center mt-2 mb-4">
            <div className="w-11/12 h-20 mt-1 flex justify-around items-center border-b-2">
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
              <div className="w-10 h-10 border-2 bg-red-400"></div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-11/12 grid grid-cols-3 gap-4">
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
              <div className="h-28 bg-green-400"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Restaurants;
