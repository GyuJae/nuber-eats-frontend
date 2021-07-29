import { Link } from "react-router-dom";
import Restaurant from "../../../components/restaurant";
import { restaurant_img_urls } from "../../../img/img-urls";
import useMe from "../../../operations/queries/me";

const MyRestaurants = () => {
  const { loading, data } = useMe();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="transition duration-500 bg-green-500 hover:bg-green-600 text-white font-bold my-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <Link to="/create-restaurant">Create Restaurant</Link>
      </div>
      {!loading && data && (
        <div className="w-9/12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {data?.me.restaurants.map((restaurant, index) => (
            <Restaurant
              key={index}
              id={restaurant.id}
              index={index}
              imgUrls={restaurant_img_urls}
              restaurantName={restaurant.name}
              categoryName={restaurant.category?.name}
            />
          ))}
          {data.me.restaurants.length === 0 && (
            <span className="text-xl mb-5">You have no restaurants.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRestaurants;
