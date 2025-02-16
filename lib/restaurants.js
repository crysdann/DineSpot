import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("restaurants.db");

export async function getRestaurants() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM restaurants").all();
}

export function getRestaurant(slug) {
  return db.prepare("SELECT * FROM restaurants WHERE slug = ?").get(slug);
}

export async function saveRestaurant(restaurant) {
  try {
    restaurant.slug = slugify(restaurant.name, { lower: true });
    restaurant.description = xss(restaurant.description);

    const extension = restaurant.image.name.split(".").pop();
    const fileName = `${restaurant.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await restaurant.image.arrayBuffer();

    stream.on("error", (err) => {
      throw new error("Saving image failed", err.message);
    });

    stream.write(Buffer.from(bufferedImage), () => {
      stream.end();
    });
    restaurant.image = `/images/${fileName}`;
    db.prepare(
      `
    INSERT INTO restaurants(
         slug,
         name,
         image,
         description,
         address,
         owner,
         owner_email) VALUES (
         @slug,
         @name,
         @image,
         @description,
         @address,
         @owner,
         @owner_email)`
    ).run(restaurant);
  } catch (error) {
    console.error("Error saving restaurant: ", error);
    throw new Error(error.message);
  }
}
