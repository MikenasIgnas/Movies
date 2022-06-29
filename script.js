const api_key = "api_key=1e96c317c7c6d72b855404b4c721864b";
const base_url = " https://api.themoviedb.org/3";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const image_url = "https://image.tmdb.org/t/p/w500";
const inputText = document.getElementById("inputText");
const submitButton = document.getElementById("submitButton");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const popularButton = document.getElementById("pupularButton");
const search_url = base_url + "/search/movie?" + api_key;
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

popularButton.addEventListener("click", getMovies());
function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `<img class="image" src = "${
      image_url + poster_path
    }" alt="${title}">
    <div class="info-container"> 
    <div class="movie-info">
    <h3 class="title">${title}</h3>
    <span class="${getColor(vote_average)}">Rating: ${vote_average}</span>
    </div>
    <div class="overview">
    <h3>Overview:</h3>
    ${overview}
    </div>
    </div>`;
    main.append(movieElement);
  });
}
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(search_url + "&query=" + searchTerm);
  } else {
    getMovies(api_url);
  }
  search.value = "";
});
