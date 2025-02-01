import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import RestaurantGrid from "@/components/restaurants/restaurant-grid";
import { getRestaurants } from "@/lib/restaurants";

async function Restaurants() {
  const restaurants = await getRestaurants();
  return <RestaurantGrid restaurants={restaurants}></RestaurantGrid>;
}

function RestaurantsPage() {
  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.highlight}>
          Most favorite restaurants that you might like
        </h2>
        <p>Choose your favourite restaurant</p>
        <p className={classes.cta}>
          <Link href="/restaurants/share">
            Share your favourite restaurant{" "}
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <Restaurants></Restaurants>
        </Suspense>
      </main>
    </>
  );
}

export default RestaurantsPage;
