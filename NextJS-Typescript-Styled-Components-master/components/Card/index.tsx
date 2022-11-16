import * as React from "react"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { StyledCard } from "./styled"

interface IProps {
  title: string
  overview: string
  image: string
  detail?: Boolean
}



export default function MovieCard({ movie, detail }: IProps) {
  const { title, genres, overview, poster_path, backdrop_path } = movie
  return (
    <StyledCard detail={detail}>
      <CardActionArea href={detail ? "#" : `/details/${movie.id}`}>
        <CardMedia
          component="img"
          height="350"
          image={
            detail
              ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${poster_path}`
          }
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          {detail && (
            <>
              <Typography gutterBottom variant="h5" component="div">
                {overview}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                Genres:
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {genres.map((genre) => genre.name).join(", ")}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}
