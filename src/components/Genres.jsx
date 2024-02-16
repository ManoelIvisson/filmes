import { useEffect, useState } from "react"

import "./Genres.css"

const genresURL = import.meta.env.VITE_GENRES
const apiKey = import.meta.env.VITE_API_KEY

function Genres() {
    const [genres, setGenres] = useState([]);
    
    async function getGenres(url) {
        const response = await fetch(url)
        const data = await response.json()

        console.log(data.genres.length)
        setGenres(data.genres)
    }

    useEffect(() => {
        const genresUrl = `${genresURL}?${apiKey}`

        getGenres(genresUrl)
    }, [])

    return (
        <div className="genres">
            {genres.map(genre => 
                <p key={genre.id}>{genre.name}</p>
            )}
        </div>
    )
}

export default Genres