import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import HeroBg from "src/assets/images/home/bg.png";
import Link from "next/link";

export default function Hero() {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>
        <Typography component="span" sx={styles.titleEmphasis}>
          Robustform ,
        </Typography>{" "}
        Form Generation Tool only for you
      </Typography>

      <Typography component="span" sx={styles.description}>
        Generate your forms in an easy way and share the link with people around
        you through your network
      </Typography>

      <Link href="/login" style={{ marginTop: "50px", marginBottom: "40px" }}>
        <Button styles={{ borderRadius: 5, width: 250 }}>Join us now</Button>
      </Link>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    minHeight: "calc(100vh - 60px)",
    padding: "0 5rem",
    backgroundColor: Colors.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pb: 4,
    backgroundImage: `url(${HeroBg.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
      // backgroundSize: "contain",
      backgroundPositionY: "0",
    },
  }),

  title: (theme) => ({
    fontSize: "3.5rem",
    fontFamily: "OutfitBlack",
    color: Colors.black,
    textAlign: "center",
    mt: 8,
    width: 800,
    lineHeight: 1.2,

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  }),

  titleEmphasis: (theme) => ({
    fontSize: "3.5rem",
    fontFamily: "OutfitBlack",
    color: Colors.primary,

    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  }),

  description: (theme) => ({
    fontSize: "1.5rem",
    fontFamily: "OutfitLight",
    color: Colors.black,
    mt: 4,
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  }),
};
