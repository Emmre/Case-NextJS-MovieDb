import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"

export const StyledCard = styled(Card)(({ detail }) => ({
  margin: detail ? "auto" : "0",
  maxWidth: detail ? "500px" : "auto",
  img: {
    minHeight: detail ? "300px" : "auto",
  },
  a: {
    display: detail ? "flex" : "block",
    justifyContent: detail ? "flex-start" : "center",
    flexDirection: detail ? "column" : "row",
    div: {
      div: {
        wordBreak: "break-word",
      },
    },
  },
}))
