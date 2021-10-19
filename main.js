// Create a form to enter new movie titles
// One input box - movie title
// Default: movies marked as "not watched" - boolean
// Radiobutton: two icons (fontawesome) to indicate watched/unwatched
// Calendar widget to establish date watched - only visible
// Add button to delete list items

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: movieTitle,
      body: movieTitle,
      watched: false,
      created_at: moment()
    }),
  })
    .then((response) => response.json())
    .then((data) => renderMovieItem(data));
}

function renderMovieItem(movieObj) {
  const li = document.createElement("li");
  li.id = movieObj.id;
  li.title=movieObj.title
  console.log(movieObj)
  renderMovieText(li, movieObj);
  movieList.appendChild(li);
}

function renderMovieText(li, movieObj) {
  console.log(movieObj.body);
  li.innerHTML = `
    <div><h3>${movieObj.title}</h3>
    <div><input type="radio" name="choice-${movieObj.title}" value="true" > 
    <label for="choice-watched" class="checkable" >Watched</label></div>
    <div><input type="radio" name="choice-${movieObj.title}" value="false">
    <label for="choice-unwatched" class="checkable">Unwatched</label></div>
    </div>
    `;
}

// // (unfinished)Event listener - when watched is selected, update the database (and eventually allow them to enter a date watched)
// function watchedMovie() {
//
// }

// // (unfinished) function to update data in the database once watched = true
// function updateWatch(movieEl) {
//   fetch(url + '/' + `${movieEl.parentElement.id}`, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       title: 
//     })
//   }
//   )}

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
