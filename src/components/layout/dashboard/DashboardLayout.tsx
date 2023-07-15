import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Main from "../Main";
import { styles as headerStyles } from "src/styles/mui-styles/header";
import { Colors } from "src/constants";
import Input from "@components/inputs/Input";
import Sidenav from "./Sidenav";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { authProvider } from "src/authProvider";

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handlers

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handlers

  const handleLogout = async () => {
    const response = await authProvider.logout(false);

    // TO DO: delete user from the gloabl state

    console.log(response);

    handleClose();

    window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>Dashboard | Robustform</title>
        <meta name="description" content="Robustform dashboard" />
      </Head>

      <Main>
        <Box component="header" sx={headerStyles.header}>
          <Typography sx={headerStyles.logo}>robustform</Typography>

          <Box sx={styles.input}>
            <Input
              label="Search"
              size="small"
              value=""
              icon={<SearchIcon color="action" />}
            />
          </Box>

          <Box onClick={handleClick}>
            <Avatar sx={headerStyles.avatar}>J</Avatar>
          </Box>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              "& .MuiMenu-paper": {
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                mt: 1.5,
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <PersonOutlineOutlinedIcon
                sx={styles.menuItemIcon}
                color="action"
              />
              <Typography sx={styles.menuItemText}>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsOutlinedIcon sx={styles.menuItemIcon} color="action" />
              <Typography sx={styles.menuItemText}>Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={styles.menuItemIcon} color="action" />
              <Typography sx={styles.menuItemText}>Log out</Typography>
            </MenuItem>
          </Menu>
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
    maxWidth: 600,
    mx: 5,

    [theme.breakpoints.down("md")]: {
      mx: 2,
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
    width: 250,
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

  menuItemIcon: {
    fontSize: "1.5rem",
    mr: 2,
  },

  menuItemText: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
  },
};
