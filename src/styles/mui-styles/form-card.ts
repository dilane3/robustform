import { SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    minHeight: 80,
    height: "auto",
    backgroundColor: Colors.background,
    padding: "1rem",
    transition: "height 0.2s ease-in-out",
    borderBottom: 1,
    borderColor: "divider",

    "&.active": {
      border: 5,
      borderColor: Colors.primary,
    }
  },

  box: {
    display: "flex",
    flexDirection: "column",
  },

  editTitle: {
    fontSize: "0.9rem",
    fontFamily: "OutfitMedium",
    marginBottom: 2
  },

  label: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    marginBottom: 2
  },

  subtitle: {
    fontSize: "0.8rem",
    fontFamily: "OutfitLight",
    color: Colors.gray
  }
};