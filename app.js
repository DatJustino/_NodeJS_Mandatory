import express from "express";
const app = express();
import path from "path";
import fs from "fs";
import {
  getReviews,
  saveReview,
  getItems,
  saveItems,
} from "./utils/utilities.js";
import { fileURLToPath } from "url";

const currentFileURL = import.meta.url;
const currentDirname = path.dirname(fileURLToPath(currentFileURL));
const PORT = 8080;

app.use(express.static("public"));
app.use("/utils", express.static(path.join(currentDirname, "utils")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/home/home.html"));
});

app.get("/jspage", (req, res) => {
  res.sendFile(path.resolve("./public/javascript/jspage.html"));
});

app.get("/restapi", async (req, res) => {
  try {
    const items = await getItems();
    const htmlContent = await fs.promises.readFile(
      path.resolve("./public/restapi/restapi.html"),
      "utf-8"
    );

    let itemsHtml = "";
    for (let item of items) {
      itemsHtml += `
        <div class="item-post">
          <div class="item-header">
            <span class="item-name">Item name: ${item.itemName}</span>
            <span class="item-description">${item.itemDescription}</span>
          </div>
          <div class="item-content">${item.itemPrice}</div>
        </div>`;
    }
    const renderedHtml2 = htmlContent.replace(
      '<div id="itemContainer"></div>',
      `<div id="itemContainer">${itemsHtml}</div>`
    );
    res.send(renderedHtml2);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong while fetching items.");
  }
});

app.get("/contact", async (req, res) => {
  try {
    const reviews = await getReviews();
    const htmlContent = await fs.promises.readFile(
      path.resolve("./public/contact/contact.html"),
      "utf-8"
    );

    let reviewsHtml = "";
    for (let review of reviews) {
      reviewsHtml += `
        <div class="review-post">
          <div class="review-header">
            <span class="review-author">Username: ${review.author}</span>
            <span class="review-timestamp">${review.timestamp}</span>
          </div>
          <div class="review-content">${review.reviewText}</div>
        </div>`;
    }
    const renderedHtml = htmlContent.replace(
      '<div id="reviewsContainer"></div>',
      `<div id="reviewsContainer">${reviewsHtml}</div>`
    );
    res.send(renderedHtml);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong while fetching reviews.");
  }
});

app.post("/add-review", async (req, res) => {
  try {
    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const review = {
      author: req.body.author,
      timestamp: timestamp,
      reviewText: req.body.reviewText,
    };
    await saveReview(review);
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "Something went wrong while saving your review.",
    });
  }
});

/*         <form id="createItem">
            <input type="text" id="itemName" placeholder="Name your item!" required maxlength="30">
            <textarea id="itemDescription" placeholder="Describe your item!" required maxlength="254"></textarea>
            <input type="text" id="itemPrice" placeholder="Set a price on your item!" required maxlength="9">
            <button type="submit">Submit</button>
        </form>

 */
app.post("/add-item", async (req, res) => {
  try {
    const item = {
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      itemPrice: req.body.itemPrice,
    };
    await saveItems(item);
    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "Something went wrong while saving your item.",
    });
  }
});

app.listen(PORT, () => console.log("Server started at port:", PORT));
