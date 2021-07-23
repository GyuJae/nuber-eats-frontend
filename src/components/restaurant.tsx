import React from "react";
import { Link } from "react-router-dom";

interface IRestaurant {
  index: number;
  imgUrls: string[];
  restaurantName: string;
  categoryName?: string;
  id: number;
}

const Restaurant: React.FC<IRestaurant> = ({
  index,
  imgUrls,
  restaurantName,
  categoryName,
  id,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div key={index} className="flex flex-col">
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgUrls[index % imgUrls.length]})`,
        }}
      ></div>
      <span className="truncate font-bold text-xl">{restaurantName}</span>
      <span className="font-normal">{categoryName}</span>
    </div>
  </Link>
);

export default Restaurant;
