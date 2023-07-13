import { SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    minHeight: 80,
    height: "auto",
    backgroundColor: Colors.background,
    padding: "1rem 1.5rem",
    transition: "height 0.2s ease-in-out",
    borderBottom: 1,
    borderColor: "divider",

    "&.active": {
      border: 5,
      borderColor: `${Colors.primary} !important`,
    }
  },

  box: {
    display: "flex",
    flexDirection: "column",
  },

  boxRow: {
    display: "flex",
    flexDirection: "row",
  },

  editTitle: {
    fontSize: "0.9rem",
    fontFamily: "OutfitMedium",
  },

  label: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    marginBottom: 2,

    "&:after": {
      content: "'  *'",
      color: Colors.red,
    }
  },

  subtitle: {
    fontSize: "0.8rem",
    fontFamily: "OutfitLight",
    color: Colors.gray
  }
};