import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import RestaurantGrid from "@/components/restaurants/restaurant-grid";

function RestaurantsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Most favorite restaurants{" "}
          <span className={classes.highlight}>that you might like</span>
        </h1>
        <p>Choose your favourite restaurant</p>
        <p className={classes.cta}>
          <Link href="/restaurants/share">Share your favourite restaurant</Link>
        </p>
      </header>
      <main className={classes.main}>
        <RestaurantGrid restaurants={[]}></RestaurantGrid>
      </main>
    </>
  );
}

export default RestaurantsPage;
