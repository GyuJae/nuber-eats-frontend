import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../../../components/pagination";
import Restaurant from "../../../components/restaurant";
import { category_img_urls, restaurant_img_urls } from "../../../img/img-urls";
import RESTAURANTS_QUERY from "../../../operations/queries/restaurants";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../../__generated__/restaurantsPageQuery";

const Restaurants = () => {
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const prevClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPage((currentPage) => currentPage - 1);
  };
  const nextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const categoryClick = (categoryName: string) => {
    history.push({
      pathname: "/category",
      search: `?category=${categoryName}`,
    });
  };

  return (
    <div>
      {!loading && (
        <>
          <div className="flex justify-center items-center mt-2 mb-4">
            <div className="w-11/12 h-28 mt-1 flex justify-center items-center border-b-2">
              {data?.allCategories.categories?.map((category, index) => (
                <div className="mr-10 flex flex-col justify-center items-center">
                  <div
                    className="w-16 h-16 bg-cover hover:bg-gray-100 rounded-full"
                    onClick={() => categoryClick(category.name)}
                    style={{
                      backgroundImage: `url(${
                        category_img_urls[index % category_img_urls.length]
                      })`,
                    }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-semibold">
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-9/12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {data?.allRestaurants.results?.map((restaurant, index) => (
                <Restaurant
                  id={restaurant.id}
                  index={index}
                  imgUrls={restaurant_img_urls}
                  restaurantName={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
          </div>
          {data?.allRestaurants.totalPages && (
            <Pagination
              page={page}
              totalPages={data.allRestaurants.totalPages}
              prevClick={prevClick}
              nextClick={nextClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Restaurants;
