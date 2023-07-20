import { SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

export const styles: Record<string, SxProps<Theme>> = {
  header: (theme) => ({
    width: "100%",
    height: 60,
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
      height: 60,
    },
  }),

  logo: (theme) => ({
    fontSize: "1.5rem",
    fontFamily: "OutfitBlack",
    color: Colors.primary,

    [theme.breakpoints.down("sm")]: {
      display: "none",
      fontSize: "1.3rem",
    },
  }),

  logoImage: (theme) => ({
    display: "none",
    alignItems: "center",
    justifyContent: "center",

    "& img": {
      width: 50,
      height: 50,
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
    }
  }),

  avatar: {
    backgroundColor: Colors.primary,
  }
};