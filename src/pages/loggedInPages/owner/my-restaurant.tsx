import { useQuery } from "@apollo/client";
import React from "react";
import { BsDot } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Dish from "../../../components/dish";
import Loading from "../../../components/loading";
import { restaurant_img_urls } from "../../../img/img-urls";
import MY_RESTAURANT_QUERY from "../../../operations/queries/my-restaurant";
import {
  MyRestaurant,
  MyRestaurantVariables,
} from "../../../__generated__/MyRestaurant";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

interface IParams {
  id: string;
}

const MyRestaurantContainer = () => {
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<MyRestaurant, MyRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                {data?.MyRestaurant.restaurant?.name}
              </span>
              <div className="flex text-base">
                <span>{data?.MyRestaurant.restaurant?.address}</span>
                <span className="flex justify-center items-center text-lg">
                  <BsDot />
                </span>
                <span>{data?.MyRestaurant.restaurant?.category?.name}</span>
              </div>
            </div>
          </div>
          <div className="mt-7 flex justify-center items-center">
            <Link
              to={`${id}/addDish`}
              className="mr-8 text-white bg-gray-800 py-3 px-10"
            >
              Add Dish
            </Link>
            <Link to={``} className=" text-white bg-green-700 py-3 px-10">
              Buy Promotion
            </Link>
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.MyRestaurant.restaurant?.menu ? (
              data?.MyRestaurant.restaurant.menu.map((dish) => (
                <Dish
                  key={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))
            ) : (
              <div>Please add menu!</div>
            )}
          </div>
          <div className="mt-20 mb-10">
            <h4 className="text-center text-2xl font-medium">Sales</h4>
            <div className="  mt-10">
              <VictoryChart
                height={500}
                theme={VictoryTheme.material}
                width={window.innerWidth}
                domainPadding={50}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryLine
                  labels={({ datum }) => `$${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 18 } as any}
                      renderInPortal
                      dy={-20}
                    />
                  }
                  data={data?.MyRestaurant.restaurant?.orders.map((order) => ({
                    x: order.createdAt,
                    y: order.total,
                  }))}
                  interpolation="natural"
                  style={{
                    data: {
                      strokeWidth: 5,
                    },
                  }}
                />
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel renderInPortal />}
                  style={{
                    tickLabels: {
                      fontSize: 20,
                    } as any,
                  }}
                  tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
                />
              </VictoryChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyRestaurantContainer;
