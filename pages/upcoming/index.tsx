import React from "react"
import { GetServerSideProps } from "next"
import { upComingMovies } from "services"
import { Content, Grid } from "styles/global"
import { Card } from "components"
import { Typography } from "@mui/material"

const UpComing = ({ res }) => {
  return (
    <Content>
      <Typography gutterBottom variant="h1" fontSize={32}>
        Upcoming Movies
      </Typography>
      <Grid>
        {res?.results?.map((item) => (
          <Card key={item.id} movie={item} />
        ))}
      </Grid>
    </Content>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await upComingMovies()
  return {
    props: {
      uaString: context.req.headers["user-agent"],
      res,
    },
  }
}

export default UpComing
