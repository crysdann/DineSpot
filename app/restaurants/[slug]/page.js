import Image from "next/image";

import { getRestaurant } from "@/lib/restaurants";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetaData({ params }) {
  const restaurant = getRestaurant(params.restaurantSlug);
  if (!restaurant) {
    notFound();
  }
  return { name: restaurant.title, description: restaurant.description };
}

async function RestaurantDetailsPage({ params }) {
  const restaurant = await getRestaurant(params.slug);
  console.log("🚀 Restaurant Data:", restaurant);
  if (!restaurant) {
    console.log("❌ Restaurant not found!");
    notFound();
  }
  if (restaurant.description)
    restaurant.description = restaurant.description.replace(/\n/g, "<br/>");
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
