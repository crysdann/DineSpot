"use server";

import error from "@/app/restaurants/error";
import { saveRestaurant } from "./restaurants";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareRestaurant(prevState, formData) {
  console.log("📌 Form Data Received:", formData);
  const restaurant = {
    name: formData.get("name"),
    owner_email: formData.get("owner_email"),
    owner: formData.get("owner"),
    address: formData.get("address"),
    description: formData.get("description"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(restaurant.name) ||
    isInvalidText(restaurant.owner_email) ||
    isInvalidText(restaurant.owner) ||
    isInvalidText(restaurant.address) ||
    isInvalidText(restaurant.description) ||
    !restaurant.owner_email.includes("@") ||
    !restaurant.image ||
    restaurant.image.size === 0
  ) {
    return { message: "Invalid Input" };
  }
  console.log("📌 Extracted Data:", restaurant);
  await saveRestaurant(restaurant);
  revalidatePath("/restaurants");
  redirect("/restaurants");
}
