import Input from "@components/inputs/Input";
import {
  Box,
  MenuItem,
  Select,
  SxProps,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";
import ChoiceItem from "@components/checkboxes/ChoiceItem";
import Card from "src/entities/card/Card";

type ChoiceListCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function ChoiceListCard({
  card,
  onActive,
}: ChoiceListCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit choice list card
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
              <ChoiceItem value="Francais" edit />
              <ChoiceItem value="Chinois" edit />
              <ChoiceItem value="Anglais" edit />
              <ChoiceItem value="Arabe" edit />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            Quelles sont les langues que vous parlez ?
          </Typography>

          <Box sx={cardStyles.box}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={10}
              label="Age"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Box>
        </Box>
      )}
    </Box>
  );
}

ChoiceListCard.defaultProps = {
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
