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
import MenuIcon from "@mui/icons-material/Menu";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Local state
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Fetch all forms
  useForms();

  // Handlers

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Dashboard | Robustform</title>
        <meta name="description" content="Robustform dashboard" />
      </Head>

      <Main>
        <Box component="header" sx={headerStyles.header}>
          <Box sx={styles.menuBox} onClick={handleOpenMenu}>
            <MenuIcon color="action" />
          </Box>

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

        <Box
          sx={(theme) => ({
            display: "none",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "250px",
            backgroundColor: Colors.background,
            zIndex: 100,
            overflowY: "auto",
            overflowX: "hidden",

            // transitions
            transition: "all 0.3s ease-in-out",
            transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",

            [theme.breakpoints.down("md")]: {
              display: "block"
            }
          })}
        >
          <Sidenav />
        </Box>

        {
          isMenuOpen && (
            <Box
              sx={(theme) => ({
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 99,
              })}
              onClick={handleCloseMenu}
            />
          )
        }
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

  menuBox: (theme) => ({
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    mr: 2,
    mt: 0.5,

    [theme.breakpoints.down("md")]: {
      display: "flex",
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

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }),

  content: (theme) => ({
    width: "calc(100% - 250px)",
    height: "100%",
    backgroundColor: Colors.background,

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }),
};
