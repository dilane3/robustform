import Button from "@components/buttons/Button";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import { Colors } from "src/constants";

export default function Start() {
  return (
    <Box component="section" sx={styles.container}>
      <Typography sx={styles.title}>Are you ready ?</Typography>

      <Box sx={styles.box}>
        <Link href="/register">
          <Button styles={{ borderRadius: 5, width: 250 }}>
            Join us now
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    height: "auto",
    padding: "0 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: 8,
    mb: 8,
  },

  title: (theme) => ({
    fontSize: "3.5rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
    textAlign: "center",
    
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    }
  }),

  box: {
    display: "flex",
    flexDirection: "row",
    mt: 4,
  }
};
