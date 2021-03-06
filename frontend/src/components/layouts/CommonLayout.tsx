import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { Header } from "components/layouts/Header"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

//typescriptによる型付け
interface CommonLayoutProps {
  children: React.ReactElement
}

export const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles();

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )

}