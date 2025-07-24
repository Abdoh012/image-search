// Variables
const input = document.querySelector("input[type='text']"); // Input field
const searchBtn = document.querySelector("input[type='submit']"); // Submit button
const imgsContainer = document.querySelector(".imgs"); // Images container
const showMoreBtn = document.querySelector(".show-more button"); // Show more button
const accessKey = "wV4O5EYpbLY-UO0JwFQ82NPrJA161UXTocVwXmvZehc"; // Access key of unsplash api

let page = 1; // Number of pages
let query; // Type of images (tree,plane,etc...)
// End of variables

// Functions

// Create image and put it in a div container
function createImg(data, i) {
  let container = document.createElement("div"); // Div container
  let img = document.createElement("img"); // Image
  img.src = data.results[i].urls.small; // Image src
  let linkOfImg = document.createElement("a");
  linkOfImg.href = data.results[i].links.html;
  linkOfImg.target = "_blank";
  // Add image to the link
  linkOfImg.appendChild(img);
  // Add link of image to the container
  container.appendChild(linkOfImg);
  // Add image to the images container
  imgsContainer.appendChild(container);
}

// Show more images when clicking on show moe button (if images container has images)
function showMore() {
  if (imgsContainer.children.length > 1) {
    page++;
  }
  getData();
}

// Get data
async function getData() {
  // Try this block of code
  try {
    // Get the response of unsplash api
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${input.value}&client_id=${accessKey}&per_page=6`
    );
    // Check if the response is not valid
    if (!response.ok) {
      console.log("Error");
    }
    // If the response is valid
    const data = await response.json(); // JSON file
    // Show all images
    for (let i = 0; i < data.results.length; i++) {
      createImg(data, i);
    }
    // Catch the error if existed
  } catch (reason) {
    console.log(reason);
  }
}
// End of functions

// click event => search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default events
  imgsContainer.textContent = "";
  getData();
  // Show the show more button
  showMoreBtn.style.cssText = "display: flex !important;";
});
