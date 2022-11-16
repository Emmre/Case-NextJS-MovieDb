import { GetServerSideProps } from "next"
import { Card } from "components"
import { FC } from "react"
import { IHomePage } from "types"
import { movieDetail, similarMovies } from "services"
import { Content, Grid } from "styles/global"
import { Typography } from "@mui/material"

const Details: FC<IHomePage> = ({ res, similar }) => {
  return (
    <Content>
      <Card movie={res} detail />
      <Typography variant="h3">Similar Movies</Typography>
      <Grid>
        {similar.results.map((item) => (
          <Card key={item.id} movie={item} />
        ))}
      </Grid>
    </Content>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.details
  const res = await movieDetail({ id })
  const similar = await similarMovies({ id })
  return {
    props: {
      res,
      similar,
      uaString: context.req.headers["user-agent"],
    },
  }
}
export default Details
