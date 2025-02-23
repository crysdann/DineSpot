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

export const events = [
  {
    id: "n1",
    slug: "world-food-festival",
    title: "World Food Festival 2024",
    image: "event1.jpg",
    date: "2024-07-01",
    content:
      "The World Food Festival brings together flavors from around the globe! Experience diverse cuisines, live cooking demonstrations, and cultural performances. A must-visit for food lovers looking to explore new tastes.",
  },
  {
    id: "n2",
    slug: "bbq-championship",
    title: "Annual BBQ Championship",
    image: "event2.jpg",
    date: "2024-08-15",
    content:
      "Join the ultimate BBQ showdown where top grill masters compete to create the most mouth-watering dishes. Enjoy smoky flavors, live music, and fun activities for all ages.",
  },
  {
    id: "n3",
    slug: "chocolate-expo",
    title: "Chocolate Lovers Expo",
    image: "event3.jpg",
    date: "2024-09-10",
    content:
      "Indulge in the sweetest event of the year! The Chocolate Lovers Expo features artisan chocolates, tastings, workshops, and exclusive desserts from top chocolatiers.",
  },
  {
    id: "n4",
    slug: "street-food-fair",
    title: "International Street Food Fair",
    image: "event4.jpg",
    date: "2024-10-05",
    content:
      "Taste your way around the world at the International Street Food Fair. From Asian delicacies to Latin American flavors, discover unique dishes served by food vendors from various cultures.",
  },
  {
    id: "n5",
    slug: "vegan-food-festival",
    title: "Vegan Food Festival",
    image: "event1.jpg",
    date: "2024-11-20",
    content:
      "Explore the best plant-based foods at the Vegan Food Festival! Enjoy delicious meat-free dishes, health-conscious desserts, and inspiring talks from top vegan chefs.",
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
    //     await client.query(`
    //    CREATE TABLE IF NOT EXISTS events (
    //         id SERIAL PRIMARY KEY,
    //         slug TEXT UNIQUE NOT NULL,
    //         title TEXT,
    //         image TEXT,
    //         date TEXT,
    //         content TEXT
    //     )
    // `);

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
