// Create a form to enter new movie titles
// One input box - movie title
// Default: movies marked as "not watched" - boolean
// Radiobutton: two icons (fontawesome) to indicate watched/unwatched
// Calendar widget to establish date watched - only visible

/* globals fetch, moment */

const url = "http://localhost:3000/movies";
const movieList = document.getElementById("movie-list");
const form = document.querySelector("#movie-form");

/*
    Watch for movie form submit and add
*/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const movieTitle = document.getElementById("movie-title").value;

  console.log(movieTitle);
  addMovie(movieTitle);
  form.reset();
});

/*
    Unfinished
*/

function addMovie(movieTitle) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "applcation/json" },
    body: JSON.stringify({
      title: movieTitle,
      body: movieTitle,
    }),
  })
    .then((response) => response.json())
    .then((data) => renderMovieItem(data));
}

function renderMovieItem(movieObj) {
  const li = document.createElement("li");
  li.id = movieObj.id;
  renderMovieText(li, movieObj);
  movieList.appendChild(li);
}

function renderMovieText(li, movieObj) {
  console.log(movieObj.title);
  li.innerHTML = `
    <h3>${movieObj.title}</h3>`;
}

function listMovies() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let item of data) {
        renderMovieItem(item);
      }
    });
}

listMovies();
