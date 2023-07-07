import Input from "@components/inputs/Input";
import {
  Box,
  SxProps,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";

type LongTextCardProps = {
  active: boolean;
  onActive: () => void;
};

export default function LongTextCard({ active, onActive }: LongTextCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={onActive}
      className={`${active ? "active" : ""}`}
    >
      {active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit card
          </Typography>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            Décrivez vous
          </Typography>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Your answer"
            style={styles.textarea as React.CSSProperties}
          />
        </Box>
      )}
    </Box>
  );
}

LongTextCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  textarea: {
    width: "100%",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: 100,
    maxHeight: 150,
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "10px 15px",
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    color: Colors.black,
    outlineColor: Colors.primary,
  },
};
