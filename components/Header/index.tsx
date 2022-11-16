import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import SearchIcon from "@mui/icons-material/Search"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  TypographyStyled,
} from "./styled"

export default function Header() {
  const [search, setSearch] = React.useState("")
  const router = useRouter()

  const searchMovieHandler = () => {
    if (search.length) {
      const searchQuery = search.replace(" ", "+")
      router.query.movieName = searchQuery
      const oldItems =
        JSON.parse(localStorage.getItem("movieHistory") as string) || []

      const newItem = {
        id:
          oldItems.length < 5
            ? oldItems.length + 1
            : oldItems[0].id,
        title: searchQuery,
        date: new Date(),
      }
      const newItems = [...oldItems, newItem]
      if (
        !oldItems.find(
          (item) => item.title.toLowerCase() === newItem.title.toLowerCase()
        )
      ) {
        if (oldItems.length < 5) {
          localStorage.setItem("movieHistory", JSON.stringify(newItems))
        } else {
          const items = oldItems.reduce((r, o) => (o.date < r.date ? o : r))
          const index = oldItems.indexOf(items)
          oldItems.splice(index, 1)
          const newItems = [...oldItems, newItem]
          localStorage.setItem("movieHistory", JSON.stringify(newItems))
        }
      } else {
        const updatedItems = oldItems.find(
          (item) => item.title.toLowerCase() === newItem.title.toLowerCase()
        )
        updatedItems.date = new Date()
        localStorage.setItem("movieHistory", JSON.stringify(oldItems))
      }
      router.push({
        pathname: "/search",
        query: { title: searchQuery },
      })
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TypographyStyled
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/">Homepage</Link>
          </TypographyStyled>
          <TypographyStyled
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/upcoming">Upcoming Movies</Link>
          </TypographyStyled>
          <Search sx={{ flexGrow: 2, display: { sm: "block" } }}>
            <SearchIconWrapper onClick={() => searchMovieHandler()}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
