import { escapeHTML } from "../../utils/escapehtml.js";


async function submitReview() {
  const username = escapeHTML(document.getElementById("username").value);
  const reviewText = escapeHTML(document.getElementById("reviewText").value);
  const currentTimestamp = new Date()
    .toISOString()
    .slice(0, 16)
    .replace("T", " ");
  const review = {
    author: username,
    reviewText: reviewText,
    currentTimestamp,
  };
  try {
    const response = await fetch("/add-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    const result = await response.json();
    if (result.status === "success") {
     window.location.reload();
    } else {
      console.error(result.message);
    }
  } catch (err) {
    console.error("Failed to submit review:", err);
  }
}
document.getElementById('reviewForm').onsubmit = function(event) { event.preventDefault(); submitReview();}