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

  addMovie(movieTitle);
  form.reset();
});

//listener detects changes to movieList added 3:18pm
movieList.addEventListener("change", (e) => {
  console.log(e.target.parentElement)
  updateWatched(e.target.parentElement)
})

function listMovies() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let item of data) {
        renderMovieItem(item);
      }
    });
}

function renderMovieItem(movieObj) {
  const li = document.createElement("li");
  li.id = movieObj.id;
  li.title=movieObj.title
  renderMovieText(li, movieObj);
  movieList.appendChild(li);
}

function renderMovieText(li, movieObj) {
  li.innerHTML = `
    <h3>${movieObj.title}</h3>
    <input type="radio" id="${movieObj.title}-watched" name="choice-${movieObj.title}" value="true" > 
    <label for="choice-watched" class="checkable" >Watched</label>
    <input type="radio" id="${movieObj.title}-unwatched" name="choice-${movieObj.title}" value="false">
    <label for="choice-unwatched" class="checkable">Unwatched</label>
  
    `;
    // if(movieObj.watched === true) {
    //   document.getElementById(`${movieObj.title}-watched`).classList.add("checked")
    // }
}

function addMovie(movieTitle) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: movieTitle,
      watched: false,
      created_at: moment()
    }),
  })
    .then((response) => response.json())
    .then((data) => renderMovieItem(data));
}


listMovies();

//(unfinished) function to update data in the database once watched = true
function updateWatched(li) {
  fetch(url + '/' + li.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      watched: true,
  }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
}
