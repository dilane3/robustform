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
import Card from "src/entities/card/Card";

type LongTextCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function LongTextCard({ card, onActive }: LongTextCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit long text card
          </Typography>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />

          <Input
            size="small"
            label="Subtitle"
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

          <Typography component="h5" sx={cardStyles.subtitle}>
            Sous titre ici
          </Typography>
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
    marginBottom: 10,
  },
};
