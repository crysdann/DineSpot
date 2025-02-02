const path = require("path");
const fs = require("fs");
const sql = require("better-sqlite3");

const originalDbPath = path.resolve(process.cwd(), "restaurants.db"); // Your original database
const writableDbPath = path.resolve("/tmp", "restaurants.db");

console.log("🔥 Checking database existence at:", writableDbPath);
console.log("📌 Database exists before copy:", fs.existsSync(writableDbPath));

// Copy the database file to /tmp if it doesn’t exist
if (!fs.existsSync(writableDbPath)) {
  console.log("📂 Copying database to /tmp...");
  if (fs.existsSync(originalDbPath)) {
    fs.copyFileSync(originalDbPath, writableDbPath);
    console.log("✅ Database copied successfully to /tmp");
  } else {
    console.error(
      "❌ Error: restaurants.db is missing in the project directory!"
    );
  }
} else {
  console.log("✔ Database already exists in /tmp");
}

// Initialize SQLite database from /tmp
console.log("🔄 Initializing database from:", writableDbPath);
const db = sql(writableDbPath);

console.log("🛠 Creating 'restaurants' table if it does not exist...");
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
console.log("✅ Table creation/check completed.");

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
];

async function initData() {
  console.log("🚀 Starting data insertion...");
  const stmt = db.prepare(`
      INSERT INTO restaurants VALUES (
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
    console.log(`📝 Inserting: ${restaurant.slug}`);
    stmt.run(restaurant);
  }

  console.log("✅ Data insertion completed!");
}

initData();
