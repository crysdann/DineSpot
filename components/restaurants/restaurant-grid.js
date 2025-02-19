import classes from "./restaurant-grid.module.css";
import RestaurantItem from "./restaurant-item";

function RestaurantGrid({ restaurants = [] }) {
  return (
    <ul className={classes.restaurants}>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <RestaurantItem {...restaurant}></RestaurantItem>
        </li>
      ))}
    </ul>
  );
}

export default RestaurantGrid;
