let imgBase = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

function buildResultPage(search, page, results) {
    let h2 = document.querySelector("h2")
    let filmList = document.querySelector("#film-list")

    h2.textContent = `Résultats pour : "${search}" | page ${page}`

    let html = results
        .map(function (movie) {
            return `
            <li>
                <figure>
                    <img src=${imgBase}${movie.poster_path} alt="${movie.title}"/>
                </figure>
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
            </li>
        `
        })
        .join("")

    filmList.innerHTML = html
}

export default buildResultPage
