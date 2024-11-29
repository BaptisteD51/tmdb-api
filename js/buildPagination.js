import buildResultPage from "./buildResultPage.js"
import TmdbApi from "./TmdbApi.js"
import key from "../key.js"

function buildPagination(search, totalPages) {
    let pagesNavigation = document.querySelector("#pages-navigation")

    pagesNavigation.innerHTML = ""

    let ul = document.createElement("ul")
    ul.id = "pagination"

    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.href = "#"
        a.textContent = i
        li.appendChild(a)

        a.addEventListener("click", (e) => paginationClickHandler(e, i, search))

        ul.appendChild(li)
    }

    pagesNavigation.appendChild(ul)
}

async function paginationClickHandler(e, page, search) {
    e.preventDefault()

    try {
        let Api = new TmdbApi(key)
        let movies = await Api.searchMovies(search, page)

        buildResultPage(search, page, movies.results)

        buildPagination(search, movies.total_pages)
    } catch (error) {
        ParaError.removeAttribute("hidden")
        ParaError.textContent = error.message
    }
}

export default buildPagination
