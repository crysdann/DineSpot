require("dotenv").config();
const { Pool } = require("pg");
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false },
});

export async function getRestaurants() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM restaurants");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Could not fetch restaurants");
  }
}

export async function getRestaurant(slug) {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM restaurants WHERE slug = $1",
      [slug]
    );
    client.release();
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Could not fetch restaurants");
  }
}

export async function saveRestaurant(restaurant) {
  try {
    const client = await pool.connect();

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
    await client.query(
      `INSERT INTO restaurants (slug, name, image, description, address, owner, owner_email) 
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        restaurant.slug,
        restaurant.name,
        restaurant.image,
        restaurant.description,
        restaurant.address,
        restaurant.owner,
        restaurant.owner_email,
      ]
    );
    client.release();
  } catch (error) {
    console.error("Error saving restaurant: ", error);
    throw new Error(error.message);
  }
}
