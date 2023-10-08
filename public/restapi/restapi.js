import { escapeHTML } from "../../utils/escapehtml.js";

{

}

async function submitItem() {
  const itemName = escapeHTML(document.getElementById("itemName").value);
  const itemDescription = escapeHTML(
    document.getElementById("itemDescription").value);
  const itemPrice = escapeHTML(document.getElementById("itemPrice").value);

  const item = {
    itemName: itemName,
    itemDescription: itemDescription,
    itemPrice: itemPrice,
  };
  try {
    const response = await fetch("/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    if (result.status === "success") {
      window.location.reload();
    } else {
      console.error(result.message);
    }
  } catch (err) {
    console.error("Failed to submit the item:", err);
  }
}
document.getElementById("createItem").onsubmit = function (event) {
  event.preventDefault();
  submitItem();
};
