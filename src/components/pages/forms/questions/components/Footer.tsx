import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";
import Link from "next/link";

export default function FooterCard() {
  return (
    <Box
      sx={cardStyles.container}
      style={{
        backgroundColor: "transparent",
        padding: "0",
        border: "none",
      }}
    >
      <Box sx={styles.box}>
        <Box sx={styles.boxRow}>
          <Typography sx={styles.indicationText}>
            Don't send critical information like credit card numbers or
            passwords via robust form.
          </Typography>
        </Box>
        <Box sx={styles.boxRow}>
          <Typography sx={styles.smallText}>Powered by</Typography>

          <Link href="/">
            <Typography sx={styles.text}>Robust Form</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  smallText: {
    fontFamily: "OutfitMedium",
    fontSize: "1rem",
    color: Colors.gray,
    marginRight: "0.5rem",
  },

  indicationText: {
    fontFamily: "OutfitRegular",
    fontSize: "0.9rem",
    color: Colors.gray,
    width: "100%",
    mb: 2
  },

  text: {
    fontFamily: "OutfitMedium",
    fontSize: "1.3rem",
    color: "#555",
  },

  box: {
    width: "100",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  boxRow: {
    width: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
