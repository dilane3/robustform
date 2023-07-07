import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";

type ShortTextCardProps = {
  active: boolean;
  onActive: () => void;
};

export default function ShortTextCard({
  active,
  onActive,
}: ShortTextCardProps) {
  return (
    <Box sx={cardStyles.container} onClick={onActive} className={`${active ? "active" : ""}`}>
      {active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>Edit card</Typography>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>Donnez votre nom</Typography>

          <Input
            size="small"
            label="Your answer"
            styles={{ marginBottom: 2 }}
          />
        </Box>
      )}
    </Box>
  );
}

ShortTextCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  
};
