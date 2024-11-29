import key from "../key.js"
import TmdbApi from "./TmdbApi.js"
import buildPagination from "./buildPagination.js"
import buildResultPage from "./buildResultPage.js"

let imgBase = "https://media.themoviedb.org/t/p/w220_and_h330_face/"
let filmList = document.querySelector("#film-list")
let h2 = document.querySelector("h2")
let form = document.querySelector("#form")
let ParaError = document.querySelector("#error")

async function displayDiscoverMovies() {
    try {
        let Api = new TmdbApi(key)
    let movies = await Api.discoverMovies()

    let html = movies.results
        .map(function (movie) {
            return `
            <li>
                <figure>
                    <img src=${imgBase}${movie.poster_path} />
                </figure>
                <h3>${movie.title}</h3>
            </li>
        `
        })
        .join("")

    filmList.innerHTML = html

    h2.textContent = "Films à découvrir"
    } catch (error) {
        ParaError.removeAttribute("hidden")
        ParaError.textContent = error.message
    }
}

displayDiscoverMovies()

// Search

async function formSubmitHandler(e) {
    e.preventDefault()

    try {
        let data = new FormData(e.target)
        let search = data.get("search")

        let Api = new TmdbApi(key)
        let movies = await Api.searchMovies(search)

        buildResultPage(search, 1, movies.results)

        buildPagination(search, movies.total_pages)
    } catch (error) {
        ParaError.removeAttribute("hidden")
        ParaError.textContent = error.message
    }
}

form.addEventListener("submit", (e) => formSubmitHandler(e))
