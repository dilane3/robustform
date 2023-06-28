import Main from "@components/layout/Main";
import Hero from "@components/pages/home/Hero";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import Head from "next/head";
import { Colors } from "src/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome | Robustform</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="robustform is a form builder for generating forms quickly and in an easy way."
        />
      </Head>

      <>
        <Box component="header" sx={styles.header}>
          <Typography sx={styles.logo}>robustform</Typography>
        </Box>

        <Main>
          <Hero />
        </Main>
      </>
    </>
  );
}

Home.noLayout = true;

const styles: Record<string, SxProps<Theme>> = {
  header: (theme) => ({
    width: "100%",
    height: 80,
    backgroundColor: Colors.background,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5rem",
    borderBottomColor: "#eee",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
      height: 60
    }
  }),

  logo: (theme) => ({
    fontSize: "2rem",
    fontFamily: "OutfitBold",
    color: Colors.primary,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    }
  })
}