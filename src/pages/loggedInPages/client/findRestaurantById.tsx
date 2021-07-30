import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import Loading from "../../../components/loading";
import RESTAURANT_QUERY from "../../../operations/queries/findRestaurantById";
import {
  RestaurantQuery,
  RestaurantQueryVariables,
} from "../../../__generated__/RestaurantQuery";
import { restaurant_img_urls } from "../../../img/img-urls";
import Dish from "../../../components/dish";
import { useState } from "react";
import { CreateOrderItemInput } from "../../../__generated__/globalTypes";
import {
  createOrder,
  createOrderVariables,
} from "../../../__generated__/createOrder";
import CREATE_ORDER_MUTATION from "../../../operations/mutations/create-order";
import { DishOption } from "../../../components/dish-options";

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

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`);
    }
  };
  const [createOrderMutation] = useMutation<createOrder, createOrderVariables>(
    CREATE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );
  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +id,
            items: orderItems,
          },
        },
      });
    }
  };
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
                {data?.findRestaurantById.restaurant?.name}
              </span>
              <div className="flex text-base">
                <span>{data?.findRestaurantById.restaurant?.address}</span>
                <span className="flex justify-center items-center text-lg">
                  <BsDot />
                </span>
                <span>
                  {data?.findRestaurantById.restaurant?.category?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full pb-2 flex flex-col items-end mt-20 pr-10 ">
            {!orderStarted && (
              <button
                onClick={triggerStartOrder}
                className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-green-600 hover:bg-green-700 px-10"
              >
                Start Order
              </button>
            )}
            {orderStarted && (
              <div className="flex items-center">
                <button
                  onClick={triggerConfirmOrder}
                  className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-green-600 hover:bg-green-700 px-10 mr-3"
                >
                  Confirm Order
                </button>
                <button
                  onClick={triggerCancelOrder}
                  className="text-lg font-medium focus:outline-none text-white py-4  transition-colors px-10 bg-black hover:bg-black"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10 pb-20">
            {data?.findRestaurantById.restaurant?.menu &&
            data.findRestaurantById.restaurant.menu.length !== 0 ? (
              data?.findRestaurantById.restaurant.menu.map((dish, index) => (
                <Dish
                  isSelected={isSelected(dish.id)}
                  id={dish.id}
                  orderStarted={orderStarted}
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  isCustomer={true}
                  options={dish.options}
                  addItemToOrder={addItemToOrder}
                  removeFromOrder={removeFromOrder}
                >
                  {dish.options?.map((option, index) => (
                    <DishOption
                      key={index}
                      dishId={dish.id}
                      isSelected={isOptionSelected(dish.id, option.name)}
                      name={option.name}
                      extra={option.extra}
                      addOptionToItem={addOptionToItem}
                      removeOptionFromItem={removeOptionFromItem}
                    />
                  ))}
                </Dish>
              ))
            ) : (
              <div>No Menu!</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantFindById;
