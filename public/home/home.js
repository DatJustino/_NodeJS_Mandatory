//Anders sanitation function.
function escapeHTML(string) {
  if (!string) return "";
  return string
    .replaceAll(`&`, "&amp;")
    .replaceAll(`>`, "&gt;")
    .replaceAll(`<`, "&lt;")
    .replaceAll(`"`, "&quot;")
    .replaceAll(`/`, "&#039;");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Rate limit exceeded");
    }
    return response.json();
  })
  .then((result) => {
    const nameHeader = document.getElementById("photo-name");
    nameHeader.innerText = capitalizeFirstLetter(result.title);

    const imageWrapperDiv = document.getElementById("image-wrapper");
    imageWrapperDiv.innerHTML = `<img src="${result.url}">`;

    const nasaCopyright = document.getElementById("nasa-copyright");
    nasaCopyright.innerText = capitalizeFirstLetter(result.copyright);
  })
  .catch((error) => {
    if (error.message === "Rate limit exceeded") {
      const container = document.getElementById("image-wrapper");
      container.innerHTML = `
        <div class="error-message">
          <p>We have abused our NASA demo key api, therefore the request is denied, error code 429.</p>
          <img src="../assets/imgs/dinosaur-trex.gif" alt="Dinosaur jumping">
        </div>
      `;
    }
  });
