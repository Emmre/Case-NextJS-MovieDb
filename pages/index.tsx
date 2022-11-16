import { GetServerSideProps } from "next"
import { useUserAgent } from "next-useragent"
import { Card } from "components"
import { FC } from "react"
import { IHomePage } from "types"
import { popularMovies } from "services"
import { Grid, Content } from "styles/global"
import { Typography } from "@mui/material"

const Home: FC<IHomePage> = ({ uaString, res }) => {
  const { isMobile } = useUserAgent(uaString)
  return (
    <Content>
      <Typography gutterBottom variant="h1" fontSize={32}>
        Popular Movies
      </Typography>
      <Grid>
        {res.results.map((item) => (
          <Card key={item.id} movie={item} />
        ))}
      </Grid>
    </Content>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await popularMovies()
  return {
    props: {
      uaString: context.req.headers["user-agent"],
      res,
    },
  }
}
export default Home
