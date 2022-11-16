import { Header } from "components"
import type { AppProps } from "next/app"
import { Fragment } from "react"
import GlobalStyle from "styles/global"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
