import Main from "@components/layout/Main";
import Block from "@components/pages/home/Block";
import Footer from "@components/pages/home/Footer";
import Hero from "@components/pages/home/Hero";
import Start from "@components/pages/home/Start";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { authProvider } from "src/authProvider";
import { Colors } from "src/constants";
import useAuth from "src/hooks/useAuth";
import { styles } from "src/styles/mui-styles/header";

export default function Home() {
  // Get the data of the current user
  useAuth();

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
