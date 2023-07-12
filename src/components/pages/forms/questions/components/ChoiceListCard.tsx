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
import React, { useEffect } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";
import ChoiceItem from "@components/checkboxes/ChoiceItem";
import Card from "src/entities/card/Card";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Question from "src/entities/card/Question";
import Icon from "@components/icons/Icon";
import DeleteIcon from "@mui/icons-material/Delete";

type ChoiceListCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function ChoiceListCard({
  card,
  onActive,
}: ChoiceListCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState(card.question.options || []);
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard, deleteCard } = useActions("forms");

  // Effects

  useEffect(() => {
    if (card.active) {
      if (
        JSON.stringify(options) !== JSON.stringify(card.question.options) ||
        label !== card.question.label
      ) {
        setModified(true);
      } else {
        setModified(false);
      }
    }
  }, [label, JSON.stringify(options)]);

  useEffect(() => {
    if (!card.active && modified) {
      // TODO: Update on supabase

      let cardData = card.toOject();
      let questionData = cardData.question;

      questionData.label = label;
      questionData.options = options;

      const question = new Question(questionData);
      const myCard = new Card({ ...cardData, question });

      updateCard({
        folderId: selectedFolder?.id,
        formId: card.formId,
        card: myCard,
      });
    } else {
      console.log("dont save");
    }
  }, [card.active]);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "label") {
      setLabel(e.target.value);
    } else if (target === "value") {
      setValue(e.target.value);
    }
  };

  const handleAddOrRemoveOption = (value: string, action: string) => {
    if (action === "add") {
      if (options.includes(value)) {
        setValue("");

        return;
      }

      setOptions([...options, value]);
      setValue("");
    } else if (action === "remove") {
      const newOptions = options.filter((option) => option !== value);

      setOptions(newOptions);

      return;
    }
  };

  const handleDelete = () => {
    deleteCard({
      folderId: selectedFolder?.id,
      formId: card.formId,
      cardId: card.id,
    });
  };

  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
        <Box sx={cardStyles.box}>
          <Box sx={styles.boxRowBetween}>
            <Typography component="h4" sx={cardStyles.editTitle}>
              Edit choice list card
            </Typography>

            <Icon onClick={handleDelete}>
              <DeleteIcon sx={{ color: Colors.red }} />
            </Icon>
          </Box>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
            value={label}
            onChange={(e) => handleChange(e, "label")}
          />

          <Box sx={styles.form}>
            <Box sx={cardStyles.boxRow}>
              <Input
                width="calc(100% - 20px)"
                label="Add item"
                size="small"
                variant="outlined"
                value={value}
                onChange={(e) => handleChange(e, "value")}
              />

              <Button
                styles={{ width: 100, height: 40 }}
                onClick={() => handleAddOrRemoveOption(value, "add")}
              >
                <Typography sx={{ fontSize: "1rem", fontFamily: "OutfitBold" }}>
                  Add
                </Typography>
              </Button>
            </Box>

            <Box sx={cardStyles.box}>
              {options.map((option, index) => (
                <ChoiceItem
                  key={index}
                  value={option}
                  onDelete={() => handleAddOrRemoveOption(option, "remove")}
                  edit
                />
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            {card.question.label}
          </Typography>

          <Box sx={cardStyles.box}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={""}
              label="Age"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {card.question.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
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
  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
};
