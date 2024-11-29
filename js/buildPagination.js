import buildResultPage from "./buildResultPage.js"
import TmdbApi from "./TmdbApi.js"
import key from "../key.js"

let h2 = document.querySelector("h2")
let filmList = document.querySelector("#film-list")
let pagesNavigation = document.querySelector("#pages-navigation") 

function buildPagination(search, totalPages){
    pagesNavigation.innerHTML = ""

    let ul = document.createElement("ul")
    ul.id = "pagination"

    for ( let i = 1; i <= totalPages; i++){
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.href = "#"
        a.textContent = i
        li.appendChild(a)

        a.addEventListener("click",(e) => paginationClickHandler(e, i, search))

        ul.appendChild(li)
    }

    pagesNavigation.appendChild(ul)
}

async function paginationClickHandler(e, page, search){
    e.preventDefault()

    let Api = new TmdbApi(key)
    let movies = await Api.searchMovies(search, page)

    buildResultPage(search, page, movies.results, h2, filmList)

    buildPagination(search, movies.total_pages)
}

export default buildPagination