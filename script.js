const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const currentImage = document.getElementById("current-image");
const current_deatil = document.getElementById("current-detail");
const searchHistory = document.getElementById("search-history");

let searches = JSON.parse(localStorage.getItem("searches")) || [];

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=tYXzivawAWBBk52FoumxkZpLwqBH72ocfGSR9aNZ&date=${currentDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      current_deatil.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;
      currentImage.style.backgroundImage = `url(${data.url})`;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=tYXzivawAWBBk52FoumxkZpLwqBH72ocfGSR9aNZ&date=${date}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImage.style.backgroundImage = `url(${data.url})`;
      current_deatil.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;

      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => {
      console.error(error);
    });
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

function addSearchToHistory() {
    searchHistory.innerHTML = "";
  
    for (let i = searches.length - 1; i >= 0; i--) {
      const searchItem = document.createElement("li");
      searchItem.innerText = searches[i];
      searchItem.addEventListener("click", () => {
        getImageOfTheDay(searches[i]);
      });
      searchHistory.appendChild(searchItem);
    }
  }

getCurrentImageOfTheDay();
addSearchToHistory();