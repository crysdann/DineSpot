import fs from "fs";
import path from "path";
import sql from "better-sqlite3";

// Define paths
const originalDbPath = path.resolve(process.cwd(), "restaurants.db"); // Local DB
const writableDbPath = path.resolve("/tmp", "restaurants.db"); // Writable location

// Ensure the database file is available in /tmp/
if (!fs.existsSync(writableDbPath)) {
  console.log("Copying database to /tmp...");
  fs.copyFileSync(originalDbPath, writableDbPath);
}

// Initialize SQLite using the writable database file
const db = sql(writableDbPath);

// ✅ Function to get all restaurants (fixed)
export function getRestaurants() {
  return db.prepare("SELECT * FROM restaurants").all();
}

// ✅ Function to get a restaurant by slug (fixed)
export function getRestaurant(slug) {
  return db.prepare("SELECT * FROM restaurants WHERE slug=?").get(slug);
}
