import Input from "@components/inputs/Input";
import {
  Box,
  SxProps,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";
import Checkbox from "@components/checkboxes/Checkbox";
import Card from "src/entities/card/Card";
import { FormsState } from "src/gx/signals";
import { useActions, useSignal } from "@dilane3/gx";
import Question from "src/entities/card/Question";
import Icon from "@components/icons/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { OTHERS_FORMS_FOLDER_ID } from "src/gx/signals/forms/constants";
import questionProvider from "src/api/questions";

type MultiChoiceCardProps = {
  card: Card;
  values: string[];
  folderId: number | null;
  onActive: (card: Card) => void;
  onAddResponse: (values: string[]) => void;
};

export default function MultiChoiceCard({
  card,
  values,
  folderId,
  onActive,
  onAddResponse,
}: MultiChoiceCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState(card.question.options || []);
  const [modified, setModified] = React.useState(false);
  const [localValues, setLocalValues] = React.useState<string[]>([]);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard, deleteCard, setUpdateProcess } = useActions("forms");

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
    const updateQuestion = async () => {
      await handleUpdateQuestion();
    }

    if (!card.active && modified) {
      updateQuestion();
    } else {
      console.log("dont save");
    }
  }, [card.active]);

  useEffect(() => {
    handleAddResponse(localValues);
  }, [localValues.length]);

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

  const handleDelete = async () => {
    deleteCard({
      folderId,
      formId: card.formId,
      cardId: card.id,
    });


    // Delete question on supabase
    setUpdateProcess({ loading: true });

    await questionProvider.delete({ id: card.id });

    setUpdateProcess({ loading: false, status: true });
  };

  const handleAddResponse = (values: string[]) => {
    onAddResponse(values);
  };

  const handleChangeResponse = (value: string) => {
    if (localValues.includes(value)) {
      const newValues = localValues.filter((v) => v !== value);

      setLocalValues(newValues);

      return;
    }

    setLocalValues((values) => [...values, value]);
  };

  const handleUpdateQuestion = async () => {
    let cardData = card.toOject();
    let questionData = cardData.question;

    questionData.label = label;
    questionData.options = options;

    const question = new Question(questionData);
    const myCard = new Card({ ...cardData, question });

    updateCard({
      folderId,
      formId: card.formId,
      card: myCard,
    });

    // Update title and description on supabase
    setUpdateProcess({ loading: true });

    const { success } = await questionProvider.update({
      title: label,
      options,
      id: card.id,
    });

    setUpdateProcess({ loading: false, status: success });
  }

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
              Edit multiple choice card
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

            <Box sx={cardStyles.box} style={{ marginTop: 20 }}>
              {options.map((option, index) => (
                <Checkbox
                  key={index}
                  value={option}
                  onDelete={(value: string) =>
                    handleAddOrRemoveOption(value, "remove")
                  }
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
            {card.question.options.map((option, index) => (
              <Checkbox
                key={index}
                value={option}
                checked={values.includes(option)}
                onChange={handleChangeResponse}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

MultiChoiceCard.defaultProps = {
  active: false,
  values: [],
  folderId: OTHERS_FORMS_FOLDER_ID,
  onActive: () => {},
  onAddResponse: () => {},
};

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
};
