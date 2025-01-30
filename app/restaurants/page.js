import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import RestaurantGrid from "@/components/restaurants/restaurant-grid";
import { getRestaurants } from "@/lib/restaurants";

async function RestaurantsPage() {
  const restaurants = await getRestaurants();
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
        <RestaurantGrid restaurants={restaurants}></RestaurantGrid>
      </main>
    </>
  );
}

export default RestaurantsPage;
