import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import { Card } from "components"
import Button from "@mui/material/Button"
import { searchMovie } from "services"
import { Content, Grid, Flex } from "styles/global"
import { Typography } from "@mui/material"

const Search = ({ search }) => {
  const [previousList, setPreviousList] = React.useState([])

  useEffect(() => {
    const movieList = localStorage.getItem("movieHistory")
    if (movieList) {
      setPreviousList(JSON.parse(movieList))
    }
  }, [])

  const handleSearch = async (e) => {
    window.location.href = `/search?title=${e}`
  }

  return (
    <Content>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Previous Searches
      </Typography>
      <Flex>
        {previousList
          .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
          .map((item) => (
            <Button
              variant="contained"
              key={item.id}
              onClick={() => handleSearch(item.title)}
              sx={{ marginRight: 1, marginBottom: 1 }}
            >
              {item.title.replace("+", " ")}
            </Button>
          ))}
      </Flex>

      <Grid>
        {search.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Content>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieTitle = context.query.title
  const search = await searchMovie({ query: movieTitle })
  if (!search.results.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      search,
      uaString: context.req.headers["user-agent"],
    },
  }
}

export default Search
