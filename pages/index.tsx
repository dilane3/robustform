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
import Image from "next/image";

import Logo from "src/assets/images/logo.png";
import Image1 from "src/assets/images/home/step1.png";
import Image2 from "src/assets/images/home/step2.png";
import Image3 from "src/assets/images/home/step3.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome | Robustform</title>
        <meta charSet="utf-8" />
        <meta 
          name=""
        />
        <meta
          name="description"
          content="robustform is a form builder for generating forms quickly and in an easy way."
        />
      </Head>

      <>
        <Box component="header" sx={styles.header}>
          <Typography sx={styles.logo}>robustform</Typography>

          <Box sx={styles.logoImage}>
            <Image src={Logo} alt="Logo" width={50} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href={"https://github.com/dilane3/robustform"}
              target="_blank"
            >
              <GitHubIcon color="action" />
            </Link>

            <Link href={"/login"} style={{ marginLeft: "40px", }}>
              <Button
                styles={{ borderRadius: 50, width: 80, height: 35 }}
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
            image={Image1}
          />

          <Block
            type="right"
            title="Share your form link"
            description={
              "Generate a link of your form and share it with people around you"
            }
            image={Image3}
          />

          <Block
            title="Access to all responses"
            description={
              "See all responses received from people and export them into an excel file easily."
            }
            image={Image2}
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

  console.log({authenticated})

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
