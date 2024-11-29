class TmdbApi {
    #key

    set key(key) {
        this.#key = key
    }

    get key() {
        return this.#key
    }

    get options() {
        return {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + this.key,
            },
        }
    }

    constructor(key) {
        this.key = key
    }

    async discoverMovies() {
        let res = await fetch("https://api.themoviedb.org/3/discover/movie", this.options)
        let movies = await res.json()

        if (movies.success == false) {
            throw new Error(movies.status_message)
        }

        return movies
    }

    async searchMovies(search, page = 1) {
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`, this.options)
        let movies = await res.json()

        if (movies.success == false) {
            throw new Error(movies.status_message)
        }

        if (movies.results.length == 0) {
            throw new Error("Pas de résultat pour votre recherche")
        }

        return movies
    }
}

export default TmdbApi
