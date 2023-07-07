import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";

type TitleCardProps = {
  active: boolean;
  onActive: () => void;
};

export default function TitleCard({ active, onActive }: TitleCardProps) {
  return (
    <Box sx={styles.container} onClick={onActive}>
      {active ? (
        <Box sx={styles.box}>
          <Input size="small" label="Title" styles={{ marginBottom: 2 }} />
          <Input size="small" label="Description" />
        </Box>
      ) : (
        <Box sx={styles.box}>
          <Typography component="h1" sx={styles.title}>
            Untitled form
          </Typography>
          <Typography component="span" sx={styles.description}>
            Description
          </Typography>
        </Box>
      )}
    </Box>
  );
}

TitleCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    minHeight: 80,
    height: "auto",
    backgroundColor: Colors.background,
    padding: "1rem",
    transition: "height 0.2s ease-in-out",
    borderBottom: 1,
    borderColor: "divider"
  },

  box: {
    display: "flex",
    flexDirection: "column",
  },

  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
  },

  description: {
    mt: 1,
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    color: Colors.gray,
  },
};
