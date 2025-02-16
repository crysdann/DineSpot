// const sql = require("better-sqlite3");
// const db = sql("restaurants.db");

require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false },
});

const dummyRestaurants = [
  {
    name: "The Gourmet Haven",
    slug: "gourmet-haven",
    image: "/images/gourmet-haven.jpg",
    description:
      "A fine dining restaurant offering a luxurious experience with exquisite cuisine and elegant ambiance.",
    address: "123 Main Street, New York, NY",
    owner: "John Doe",
    owner_email: "johndoe@example.com",
  },
  {
    name: "Spice Delight",
    slug: "spice-delight",
    image: "/images/spice-delight.jpg",
    description:
      "Authentic Indian cuisine with a perfect blend of spices, rich flavors, and traditional recipes.",
    address: "45 Curry Lane, San Francisco, CA",
    owner: "Amit Patel",
    owner_email: "amit@example.com",
  },
  {
    name: "Bella Pasta",
    slug: "bella-pasta",
    image: "/images/bella-pasta.jpg",
    description:
      "A charming Italian eatery serving handmade pasta, wood-fired pizzas, and delicious wines.",
    address: "78 Olive Street, Chicago, IL",
    owner: "Giovanni Russo",
    owner_email: "giovanni@example.com",
  },
  {
    name: "Sakura Sushi",
    slug: "sakura-sushi",
    image: "/images/sakura-sushi.jpg",
    description:
      "A modern Japanese restaurant offering fresh sushi, sashimi, and flavorful ramen.",
    address: "12 Sushi Blvd, Los Angeles, CA",
    owner: "Emily Chen",
    owner_email: "emilychen@example.com",
  },
  {
    name: "Green Leaf Café",
    slug: "green-leaf-cafe",
    image: "/images/green-leaf-cafe.jpg",
    description:
      "A cozy café with organic, plant-based meals and specialty coffee.",
    address: "99 Vegan Way, Portland, OR",
    owner: "Sophia Green",
    owner_email: "sophiagreen@example.com",
  },
  {
    name: "The Steakhouse",
    slug: "the-steakhouse",
    image: "/images/the-steakhouse.jpg",
    description:
      "A top-rated steakhouse known for its premium cuts and perfectly grilled meats.",
    address: "55 Carnivore Road, Dallas, TX",
    owner: "Michael Brown",
    owner_email: "michaelbrown@example.com",
  },
  {
    name: "Ocean Breeze Seafood",
    slug: "ocean-breeze-seafood",
    image: "/images/ocean-breeze.jpg",
    description:
      "Fresh seafood dishes prepared with locally sourced ingredients and a coastal vibe.",
    address: "7 Seaside Avenue, Miami, FL",
    owner: "Lisa White",
    owner_email: "lisawhite@example.com",
  },
];

async function initializeDB() {
  const client = await pool.connect();
  try {
    await client.query(`
   CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        image TEXT,
        description TEXT,
        address TEXT,
        owner TEXT,
        owner_email TEXT
    )
`);

    for (let restaurant of dummyRestaurants) {
      await client.query(
        `INSERT INTO restaurants (name, slug, image, description, address, owner, owner_email)
         VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING;`,
        [
          restaurant.name,
          restaurant.slug,
          restaurant.image,
          restaurant.description,
          restaurant.address,
          restaurant.owner,
          restaurant.owner_email,
        ]
      );
    }

    console.log("✅ Database initialized with dummy data!");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  } finally {
    client.release();
  }
}

// Run initialization
initializeDB();
