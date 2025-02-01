import sql from "better-sqlite3";

const db = sql("restaurants.db");

export async function getRestaurants() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error();
  return db.prepare("SELECT * FROM restaurants").all();
}

export function getRestaurant(slug) {
  return db.prepare("SELECT * FROM restaurants where slug=?").get(slug);
}
