import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";

type TitleCardProps = {
  active: boolean;
  onActive: () => void;
};

export default function TitleCard({ active, onActive }: TitleCardProps) {
  return (
    <Box sx={cardStyles.container} onClick={onActive} className={`${active ? "active" : ""}`}>
      {active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>Edit card</Typography>

          <Input size="small" value="aba" variant="standard" label="Title" styles={{ marginBottom: 2 }} />
          <Input size="small" variant="standard" label="Description" />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
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
