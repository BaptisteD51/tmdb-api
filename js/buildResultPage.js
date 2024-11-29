let imgBase = "https://media.themoviedb.org/t/p/w220_and_h330_face/"

function buildResultPage(search, page, results, title, list){
    title.textContent = `Résultats pour : "${search}" | page ${page}`

    let html = results.map(function(movie){
        return `
            <li>
                <figure>
                    <img src=${imgBase}${movie.poster_path} />
                </figure>
                <h3>${movie.title}</h3>
            </li>
        `
    }).join("")

    list.innerHTML = html
}

export default buildResultPage