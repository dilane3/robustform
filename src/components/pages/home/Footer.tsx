import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";

export default function Footer() {
  return (
    <Box component="footer" sx={styles.container}>
      <Typography sx={styles.logo}>robustform</Typography>
      <Typography sx={styles.year}>
        <span>&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </Typography>
      <Typography sx={styles.author}>by Dilane3</Typography>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    minHeight: "60px",
    padding: "0 5rem",
    backgroundColor: Colors.secondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
    },
  }),

  logo: {
    fontSize: "1.2rem",
    fontFamily: "OutfitBlack",
    color: Colors.background,
  },

  year: {
    fontSize: "1rem",
    fontFamily: "OutfitMedium",
    color: Colors.background,
    gap: "1rem",
    display: "flex",
    alignItems: "center",
  },

  author: {
    fontSize: "1rem",
    fontFamily: "OutfitBold",
    color: Colors.background,
  },
};
