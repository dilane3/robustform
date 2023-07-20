import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Card from "src/entities/card/Card";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Question from "src/entities/card/Question";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@components/icons/Icon";
import { OTHERS_FORMS_FOLDER_ID } from "src/gx/signals/forms/constants";
import questionProvider from "src/api/questions";

type ShortTextCardProps = {
  card: Card;
  values: string[];
  folderId: number | null;
  onActive: (card: Card) => void;
  onAddResponse: (values: string[]) => void;
};

export default function ShortTextCard({
  card,
  values,
  folderId,
  onActive,
  onAddResponse,
}: ShortTextCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [subtitle, setSubtitle] = React.useState(card.subtitle || "");
  const [modified, setModified] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard, deleteCard, setUpdateProcess } = useActions("forms");

  // Effects

  useEffect(() => {
    if (card.active) {
      if (subtitle !== card.subtitle || label !== card.question.label) {
        setModified(true);
      } else {
        setModified(false);
      }
    }
  }, [label, subtitle]);

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

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "label") {
      setLabel(e.target.value);
    } else if (target === "subtitle") {
      setSubtitle(e.target.value);
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

  const handleAddResponse = (e: ChangeEvent<HTMLInputElement>) => {
    onAddResponse([e.target.value]);
  };

  const handleUpdateQuestion = async () => {
    let cardData = card.toOject();
    let questionData = cardData.question;

    questionData.label = label;
    cardData.subtitle = subtitle;

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
      subtitle,
      id: card.id
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
              Edit short text card
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

          <Input
            size="small"
            label="Subtitle"
            variant="standard"
            styles={{ marginBottom: 2 }}
            value={subtitle}
            onChange={(e) => handleChange(e, "subtitle")}
          />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            {card.question.label}
          </Typography>

          <Input
            size="small"
            label="Your answer"
            styles={{ marginBottom: 2 }}
            value={values.length > 0 ? values[0] : ""}
            onChange={handleAddResponse}
          />

          <Typography component="h5" sx={cardStyles.subtitle}>
            {card.subtitle}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

ShortTextCard.defaultProps = {
  active: false,
  values: [],
  folderId: OTHERS_FORMS_FOLDER_ID,
  onActive: () => {},
  onAddResponse: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
};
