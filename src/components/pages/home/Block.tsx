import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import Image from "next/image";

type BlockProps = {
  type?: "left" | "right";
  title: string;
  image: any;
  description: string;
};

export default function Block({ type, title, description, image }: BlockProps) {
  const containerStyle =
    type === "right" ? styles.containerRight : styles.container;

  return (
    <Box component="section" sx={containerStyle}>
      <Box sx={styles.left}>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.description}>{description}</Typography>
      </Box>

      <Box sx={styles.right}>
        <Image
          src={image}
          style={styles.image as React.CSSProperties}
          alt="block"
          width={500}
        />
      </Box>
    </Box>
  );
}

Block.defaultProps = {
  type: "left",
};

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  container: (theme) => ({
    width: "100%",
    minHeight: "calc(100vh - 80px)",
    padding: "0 5rem",
    backgroundColor: `#f8f8f8`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    pb: 5,
    gap: "5rem",
    mb: 4,
    border: "1px solid #eaeaea",

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
      flexDirection: "column-reverse",
      gap: "3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
    },
  }),

  // linear gradient

  containerRight: (theme) => ({
    width: "100%",
    minHeight: "calc(100vh - 80px)",
    padding: "0 5rem",
    backgroundColor: `#f8f8f8`,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    pb: 5,
    gap: "5rem",
    mb: 4,
    border: "1px solid #eaeaea",

    [theme.breakpoints.down("md")]: {
      padding: "0 3rem",
      flexDirection: "column-reverse",
      gap: "3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5rem",
    },
  }),

  left: (theme) => ({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    },
  }),

  right: (theme) => ({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      width: "100%",
      mt: 5
    },
  }),

  title: (theme) => ({
    fontSize: "3rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
    lineHeight: 1.2,

    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  }),

  description: (theme) => ({
    fontSize: "1.5rem",
    fontFamily: "OutfitRegular",
    color: Colors.black,
    mt: 4,

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  }),

  image: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "auto",
    // maxHeight: 300,
  },
};
