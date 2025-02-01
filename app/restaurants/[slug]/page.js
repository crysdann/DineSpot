import Image from "next/image";

import { getRestaurant } from "@/lib/restaurants";
import classes from "./page.module.css";

function RestaurantDetailsPage({ params }) {
  const restaurant = getRestaurant(params.slug);
  restaurant.description = restaurant.description.replace(/\n/g, "<br/>");
  console.log("restaurant: ", restaurant);
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={restaurant.image} alt={restaurant.name} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{restaurant.name}</h1>
          {/* <p className={classes.creator}>{restaurant.description}</p> */}
          <p className={classes.address}>{restaurant.address}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: restaurant.description }}></p>
      </main>
    </>
  );
}

export default RestaurantDetailsPage;
