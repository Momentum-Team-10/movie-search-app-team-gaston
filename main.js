/* globals fetch, moment */

const url = "http://localhost:3000/movies"
const moviesList = document.getElementById("movies-list")
const form = document.querySelector("#movie-form")


/*
    Watch for movie form submit and add
*/
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const movieTitle = document.getElementById("input-field").value;

    console.log(movieTitle);
    addMovie(movieTitle);
    form.reset();
})

/*
    Unfinished
*/

function addMovie(movieTitle) {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "applcation/json"},
        body: JSON.stringify({
            title:
        })
    })
}