const sql = require("better-sqlite3");
const db = sql("./tmp/restaurants.db");

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

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS restaurants (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       name TEXT NOT NULL,
       image TEXT NOT NULL,
       description TEXT NOT NULL,
       address TEXT NOT NULL,
       owner TEXT NOT NULL,
       owner_email TEXT NOT NULL
    )
`
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @name,
         @image,
         @description,
         @address,
         @owner,
         @owner_email
      )
   `);

  for (const restaurant of dummyRestaurants) {
    stmt.run(restaurant);
  }
}

initData();
