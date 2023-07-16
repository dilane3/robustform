import Main from "@components/layout/Main";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { authProvider } from "src/authProvider";
import { Colors } from "src/constants";
import { styles as headerStyles } from "src/styles/mui-styles/header";
import emailVerifyImage from "src/assets/images/email-check.png";
import Image from "next/image";

export default function VerifyEmail() {
  return (
    <>
      <Head>
        <title>Verify Email | Robustform</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="robustform is a form builder for generating forms quickly and in an easy way."
        />
      </Head>
      <Main>
        <Box sx={headerStyles.header}>
          <Typography sx={headerStyles.logo}>Robustform</Typography>
        </Box>
        <Box component="section" sx={styles.container}>
          <Image
            alt="Check email"
            src={emailVerifyImage}
            width={300}
            style={{ width: 300, height: "auto", marginTop: 20 }}
          />
          <Typography sx={styles.title}>Verify your email</Typography>
          <Typography sx={styles.description}>
            Please check you email, we sent to you a confirmation link that you
            will use to activate your account
          </Typography>
        </Box>
      </Main>
    </>
  );
}

VerifyEmail.noLayout = true;

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 0,
    padding: "2rem 5rem",
    width: "100%",
    height: "calc(100vh - 60px)",
    backgroundColor: Colors.background,

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
      height: 60,
      "& img": {
        width: "250px !important"
      }
    },
  }),

  title: (theme) => ({
    fontSize: "2rem",
    fontFamily: "OutfitMedium",
    mt: 3,
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  }),

  description: (theme) => ({
    fontSize: "1.3rem",
    fontFamily: "OutfitRegular",
    mt: 2,
    color: Colors.gray,
    width: 500,
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "1rem",
    },
  }),
};
