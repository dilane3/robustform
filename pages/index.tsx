import Main from "@components/layout/Main";
import Block from "@components/pages/home/Block";
import Footer from "@components/pages/home/Footer";
import Hero from "@components/pages/home/Hero";
import Start from "@components/pages/home/Start";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { authProvider } from "src/authProvider";
import { styles } from "src/styles/mui-styles/header";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import Button from "@components/buttons/Button";

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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href={"https://github.com/dilane3/robustform"}
              target="_blank"
            >
              <GitHubIcon color="action" />
            </Link>

            <Link href={"/login"}>
              <Button
                styles={{ borderRadius: 1, width: 80, height: 35, ml: 4 }}
              >
                <Typography
                  sx={{ fontSize: "0.8rem", fontFamily: "OutfitMedium" }}
                >
                  Login
                </Typography>
              </Button>
            </Link>
          </Box>
        </Box>

        <Main>
          <Hero />

          <Block
            title="Create a form in an easy way"
            description={
              "Choose the different type of question that you want and generate your form"
            }
          />

          <Block
            type="right"
            title="Share your form link"
            description={
              "Generate a link of your form and share it with people around you"
            }
          />

          <Block
            title="Access to all responses"
            description={
              "See all responses received from people and export them into an excel file easily."
            }
          />

          <Start />

          <Footer />
        </Main>
      </>
    </>
  );
}

Home.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/forms`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
