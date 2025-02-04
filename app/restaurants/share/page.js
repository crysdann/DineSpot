"use client";
import { useFormStatus, useFormState } from "react-dom";
import ImagePicker from "@/components/restaurants/image-picker";
import classes from "./page.module.css";
import { shareRestaurant } from "@/lib/actions";
import RestaurantFormSubmit from "@/components/restaurants/restaurant-form-submit";
import { useActionState } from "react";

export default function ShareRestaurantPage() {
  const [state, formAction] = useFormState(shareRestaurant, {
    message: null,
  });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your{" "}
          <span className={classes.highlight}>favourite restaurant</span>
        </h1>
        <p>Or any other restaurant you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="owner_email">Your email</label>
              <input
                type="email"
                id="owner_email"
                name="owner_email"
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="owner">Owner</label>
            <input type="text" id="owner" name="owner" required />
          </p>
          <p>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" required />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="10"
              required></textarea>
          </p>
          <ImagePicker label="your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <RestaurantFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
