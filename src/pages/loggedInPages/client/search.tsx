import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Loading from "../../../components/loading";
import Pagination from "../../../components/pagination";
import Restaurant from "../../../components/restaurant";
import { restaurant_img_urls } from "../../../img/img-urls";
import SEARCHRESTAURANTS_QUERY from "../../../operations/queries/search-restaurants";
import {
  SearchRestaurantsQuery,
  SearchRestaurantsQueryVariables,
} from "../../../__generated__/SearchRestaurantsQuery";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const history = useHistory();
  const prevClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPage((currentPage) => currentPage - 1);
  };
  const nextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPage((currentPage) => currentPage + 1);
  };
  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchRestaurantsQuery,
    SearchRestaurantsQueryVariables
  >(SEARCHRESTAURANTS_QUERY);
  useEffect(() => {
    const query = location.search.split("?term=")[1];
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        searchRestaurantInput: {
          page,
          query,
        },
      },
    });
  }, [callQuery, history, location, page]);
  return (
    <div>
      <div className="flex justify-center items-center mt-5">
        {loading && !called && !data ? (
          <Loading />
        ) : (
          <div className="w-9/12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {data?.searchRestaurants.restaurants?.map((restaurant, index) => (
              <Restaurant
                id={restaurant.id}
                index={index}
                imgUrls={restaurant_img_urls}
                restaurantName={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
      </div>
      {data?.searchRestaurants.totalPages && (
        <Pagination
          page={page}
          totalPages={data.searchRestaurants.totalPages}
          prevClick={prevClick}
          nextClick={nextClick}
        />
      )}
    </div>
  );
};

export default Search;
