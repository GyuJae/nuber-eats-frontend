import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Loading from "../../../components/loading";
import Pagination from "../../../components/pagination";
import Restaurant from "../../../components/restaurant";
import { restaurant_img_urls } from "../../../img/img-urls";
import CATEGORY_QUERY from "../../../operations/queries/category";
import {
  restaurantsByCategory,
  restaurantsByCategoryVariables,
} from "../../../__generated__/restaurantsByCategory";

const RestaurantsByCategory = () => {
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
    restaurantsByCategory,
    restaurantsByCategoryVariables
  >(CATEGORY_QUERY);

  const slug = location.search.split("?category=")[1];
  useEffect(() => {
    callQuery({
      variables: {
        input: {
          page,
          slug,
        },
      },
    });
  }, [history, page, location, callQuery, slug]);
  return (
    <div>
      <div className="flex justify-center items-center mt-5">
        {loading && !called && !data ? (
          <Loading />
        ) : (
          data?.category.restaurants && (
            <div className="w-9/12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {data?.category.restaurants.map((restaurant, index) => (
                <Restaurant
                  id={restaurant.id}
                  index={index}
                  imgUrls={restaurant_img_urls}
                  restaurantName={restaurant.name}
                  categoryName={slug}
                />
              ))}
            </div>
          )
        )}
      </div>
      {data?.category.totalPages && (
        <Pagination
          page={page}
          totalPages={data.category.totalPages}
          prevClick={prevClick}
          nextClick={nextClick}
        />
      )}
    </div>
  );
};

export default RestaurantsByCategory;
