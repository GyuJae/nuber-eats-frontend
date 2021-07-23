import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import Loading from "../../../components/loading";
import RESTAURANT_QUERY from "../../../operations/queries/findRestaurantById";
import {
  RestaurantQuery,
  RestaurantQueryVariables,
} from "../../../__generated__/RestaurantQuery";
import { restaurant_img_urls } from "../../../img/img-urls";

interface IRestaurantParams {
  id: string;
}

const RestaurantFindById = () => {
  const { id } = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<RestaurantQuery, RestaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-full h-96 flex flex-col justify-end bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              restaurant_img_urls[+id % restaurant_img_urls.length]
            })`,
          }}
        >
          <div className="w-2/12 flex flex-col pl-8 pb-8 mb-28 text-black bg-white">
            <span className="text-4xl font-semibold">
              {data?.findRestaurantById.restaurant?.name}
            </span>
            <div className="flex text-base">
              <span>{data?.findRestaurantById.restaurant?.address}</span>
              <span className="flex justify-center items-center text-lg">
                <BsDot />
              </span>
              <span>{data?.findRestaurantById.restaurant?.category?.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantFindById;
