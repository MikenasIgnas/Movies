const api_key = "api_key=1e96c317c7c6d72b855404b4c721864b";
const base_url = " https://api.themoviedb.org/3";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const image_url = "https://image.tmdb.org/t/p/w500";
const inputText = document.getElementById("inputText");
const submitButton = document.getElementById("submitButton");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const popularButton = document.getElementById("pupularButton");
const search_url = base_url + "/search/movie?" + api_key;
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      console.log(data.results);
    });
}

popularButton.addEventListener("click", getMovies());
function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie, i) => {
    console.log(i);
    const {
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      vote_count,
    } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `<img class="image" src = "${
      image_url + poster_path
    }" alt="${title}">
    <div class="info-container"> 
    <div class="movie-info">
    <h3 class="title">${title}</h3>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Movie information
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <span class="${getColor(vote_average)}">Rating: ${vote_average}</span>
      <div> <span>Release date: ${release_date}</span></div>
      <div>
      <span>Vote count: </span>
      ${vote_count}
      </div>
      
      <div class="overview">
    <span>Overview:</span>
    ${overview}
    </div>
      </div>
    </div>
  </div>
  </div>
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
const search2 = document.getElementById("search2");

function searchMovie(formSelect, searchInput) {
  formSelect.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
      getMovies(search_url + "&query=" + searchTerm);
    } else {
      getMovies(api_url);
    }
    formSelect.style.display = "none";
    form.style.display = "flex";
    searchInput.value = "";
  });
}
searchMovie(searchForm, search2);
searchMovie(form, search);
