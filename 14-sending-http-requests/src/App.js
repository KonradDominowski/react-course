import React, { useState, useEffect, useCallback } from 'react';

import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])

  // const fetchMovies = useCallback(async () => {
  //   setError(null)
  //   setIsLoading(true)

  //   try {
  //     const res = await fetch(`https://swapi.py4e.com/api/films/`)

  //     if (!res.ok) {
  //       throw new Error(`Something went wrong.`)
  //     }

  //     const data = await res.json()

  //     const movies = data.results.map(movie => {
  //       return {
  //         id: movie.episode_id,
  //         title: movie.title,
  //         releaseDate: movie.release_date,
  //         openingText: movie.opening_crawl
  //       }
  //     })

  //     setMovies(movies)
  //   } catch (error) {
  //     setError(error.message)
  //   }
  //   setIsLoading(false)
  // }, [])

  const fetchMovies = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch(`https://react-course-51208-default-rtdb.firebaseio.com/movies.json/`)

      if (!res.ok) {
        throw new Error(`Something went wrong.`)
      }

      const data = await res.json()

      console.log(data)

      let movies = []

      for (const key in data) {
        movies.push({
          id: key,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText
        })
      }
      setMovies(movies)

    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])


  async function postMovieHandler(movie) {
    const res = await fetch(`https://react-course-51208-default-rtdb.firebaseio.com/movies.json`,
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-type': 'application/json'
        }
      })
    console.log(res)
    const data = await res.json()
    console.log(data)
  }

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])


  let content = <p>No movies found.</p>

  if (movies.length > 0) { content = <MoviesList movies={ movies } /> }

  if (error) { content = <p>{ error }</p> }

  if (isLoading) { content = <p>Loading...</p> }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={ postMovieHandler } />
      </section>
      <section>
        <button onClick={ fetchMovies }>Fetch Movies</button>
      </section>
      <section>
        { content }
      </section>
    </React.Fragment>
  );
}

export default App;
