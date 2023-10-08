import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REVIEWS_FILE = path.resolve(__dirname, "../public/contact/reviews.json");
const ITEMS_FILE = path.resolve(__dirname, "../public/restapi/restapi.json");

export async function getReviews() {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = await fs.promises.readFile(REVIEWS_FILE, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    throw error;
  }
}

export async function getItems() {
  try {
    if (fs.existsSync(ITEMS_FILE)) {
      const data = await fs.promises.readFile(ITEMS_FILE, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    throw error;
  }
}


export async function saveReview(newReview) {
  try {
    let reviews = [];
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = await fs.promises.readFile(REVIEWS_FILE, "utf-8");
      if (data.trim()) {
        try {
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData)) {
            reviews = parsedData;
          }
        } catch (e) {
          console.error("Error parsing reviews data:", e);
        }
      }
    }
    reviews.unshift(newReview);

    await fs.promises.writeFile(
      REVIEWS_FILE,
      JSON.stringify(reviews, null, 2),
      "utf-8"
    );
  } catch (error) {
    throw error;
  }
}

export async function saveItems(newItems) {
  try {
    let items = [];
    if (fs.existsSync(ITEMS_FILE)) {
      const data = await fs.promises.readFile(ITEMS_FILE, "utf-8");
      if (data.trim()) {
        try {
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData)) {
            items = parsedData;
          }
        } catch (e) {
          console.error("Error parsing reviews data:", e);
        }
      }
    }
    items.unshift(newItems);

    await fs.promises.writeFile(
      ITEMS_FILE,
      JSON.stringify(items, null, 2),
      "utf-8"
    );
  } catch (error) {
    throw error;
  }
}
