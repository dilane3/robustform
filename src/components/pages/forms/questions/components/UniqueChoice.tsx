import Input from "@components/inputs/Input";
import {
  Box,
  SxProps,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";
import Radio from "@components/checkboxes/Radio";
import Card from "src/entities/card/Card";
import { FormsState } from "src/gx/signals";
import { useActions, useSignal } from "@dilane3/gx";
import Question from "src/entities/card/Question";

type UniqueChoiceCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function UniqueChoiceCard({
  card,
  onActive,
}: UniqueChoiceCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState(card.question.options || []);
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard } = useActions("forms");

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

  return (
    <Box
      sx={cardStyles.container}
      onClick={() => onActive(card)}
      className={`${card.active ? "active" : ""}`}
    >
      {card.active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit unique choice card
          </Typography>

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
                <Radio
                  key={index}
                  value={option}
                  edit
                  onDelete={(value: string) =>
                    handleAddOrRemoveOption(value, "remove")
                  }
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
            {card.question.options.map((option, index) => (
              <Radio key={index} value={option} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

UniqueChoiceCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2
  }
};
