import React from "react";
import { MyRestaurant_MyRestaurant_restaurant_menu_options } from "../__generated__/MyRestaurant";

interface IDishProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  options?: MyRestaurant_MyRestaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
}

const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  options,
  orderStarted = false,
  addItemToOrder,
  removeFromOrder,
  isSelected,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`px-8 py-4 border cursor-pointer ${
        isSelected ? " bg-gray-200 " : " hover:border-gray-800"
      } transition-all`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium">
          {name}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                isSelected ? "bg-red-500" : " bg-green-600"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          <div className="grid gap-2  justify-start">{dishOptions}</div>
        </div>
      )}
    </div>
  );
};

export default Dish;
