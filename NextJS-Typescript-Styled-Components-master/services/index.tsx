import axios from "axios"

export const searchMovie = ({ query }) => {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=64d8aa762e5eca1f8be6b3971b76ddad&query=${query}`
    )
    .then((res) => res.data)

  return data
}

export const movieDetail = ({ id }) => {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=64d8aa762e5eca1f8be6b3971b76ddad`
    )
    .then((res) => res.data)

  return data
}

export const upComingMovies = () => {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=64d8aa762e5eca1f8be6b3971b76ddad&language=en-US&page=1`
    )
    .then((res) => res.data)

  return data
}

export const similarMovies = ({ id }) => {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=64d8aa762e5eca1f8be6b3971b76ddad&language=en-US&page=1`
    )
    .then((res) => res.data)

  return data
}
export const popularMovies = () => {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=64d8aa762e5eca1f8be6b3971b76ddad&language=en-US&page=1`
    )
    .then((res) => res.data)

  return data
}
