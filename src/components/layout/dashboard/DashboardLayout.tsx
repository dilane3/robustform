import { Box, SxProps, Theme, Typography } from "@mui/material";
import Head from "next/head";
import Main from "../Main";
import { styles as headerStyles } from "src/styles/mui-styles/header";
import { Colors } from "src/constants";
import Input from "@components/inputs/Input";
import Sidenav from "./Sidenav";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useSignal } from "@dilane3/gx";
import { AuthState } from "src/gx/signals/auth";
import useForms from "src/hooks/useForms";
import HeaderAvatar from "./HeaderAvatar";
import Image from "next/image";
import Logo from "src/assets/images/logo.png";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Fetch all forms
  useForms();

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Dashboard | Robustform</title>
        <meta name="description" content="Robustform dashboard" />
      </Head>

      <Main>
        <Box component="header" sx={headerStyles.header}>
          <Typography sx={headerStyles.logo}>robustform</Typography>

          <Box sx={headerStyles.logoImage}>
            <Image src={Logo} alt="Logo" width={50} />
          </Box>

          <Box sx={styles.input}>
            <Input
              label="Search"
              size="small"
              value=""
              icon={<SearchIcon color="action" />}
            />
          </Box>

          <HeaderAvatar />
        </Box>

        <Box component="section" sx={styles.bodyContainer}>
          <Box component="aside" sx={styles.sidenar}>
            <Sidenav />
          </Box>
          <Box component="section" sx={styles.content}>
            {children}
          </Box>
        </Box>
      </Main>
    </>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  input: (theme) => ({
    width: "100%",
    maxWidth: 400,
    mx: 5,

    [theme.breakpoints.down("md")]: {
      mx: 4,
    },
  }),

  bodyContainer: (theme) => ({
    width: "100%",
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }),

  sidenar: (theme) => ({
    width: 280,
    height: "100%",
    backgroundColor: Colors.sidenav,
    transition: "all 0.3s ease-in-out",
    overflowY: "auto",
    overflowX: "hidden",
    borderRight: "1px solid #eee",

    // [theme.breakpoints.down("md")]: {
    //   width: 50,
    // }
  }),

  content: (theme) => ({
    width: "calc(100% - 250px)",
    height: "100%",
    backgroundColor: Colors.background,
  }),
};
