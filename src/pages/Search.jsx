import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

function Search() {
    const [searchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    async function getSearchedMovies (url) {
        const response = await fetch(url)
        const data = await response.json()

        setMovies(data.results)
    }

    useEffect(() => {
        const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`

        getSearchedMovies(searchWithQueryUrl)
    }, [query])

    return (
        <div className="container">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Loading...</p>}
                {movies.length > 0 && movies.map((movie) => 
                    <MovieCard key={movie.id} movie={movie}/>
                )}
            </div>
        </div>
    )
}

export default Search