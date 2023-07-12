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
import Button from "@components/buttons/Button";
import Checkbox from "@components/checkboxes/Checkbox";
import Card from "src/entities/card/Card";

type MultiChoiceCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function MultiChoiceCard({
  card,
  onActive,
}: MultiChoiceCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit multiple choice card
          </Typography>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />

          <Box sx={styles.form}>
            <Box sx={cardStyles.boxRow}>
              <Input
                width="calc(100% - 20px)"
                label="Add item"
                size="small"
                variant="outlined"
              />

              <Button styles={{ width: 100, height: 40 }}>
                <Typography sx={{ fontSize: "1rem", fontFamily: "OutfitBold" }}>
                  Add
                </Typography>
              </Button>
            </Box>

            <Box sx={cardStyles.box}>
              <Checkbox value="Francais" edit />
              <Checkbox value="Chinois" edit />
              <Checkbox value="Anglais" edit />
              <Checkbox value="Arabe" edit />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            Quelles sont les langues que vous parlez ?
          </Typography>

          <Box sx={cardStyles.box}>
            <Checkbox value="Francais" />
            <Checkbox value="Chinois" />
            <Checkbox value="Anglais" />
            <Checkbox value="Arabe" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

MultiChoiceCard.defaultProps = {
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
