import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Card from "src/entities/card/Card";

type ShortTextCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function ShortTextCard({ card, onActive }: ShortTextCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
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
            Donnez votre nom
          </Typography>

          <Input
            size="small"
            label="Your answer"
            styles={{ marginBottom: 2 }}
          />

          <Typography component="h5" sx={cardStyles.subtitle}>
            Sous titre ici
          </Typography>
        </Box>
      )}
    </Box>
  );
}

ShortTextCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {};
