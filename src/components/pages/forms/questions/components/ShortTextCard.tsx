import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Card from "src/entities/card/Card";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Question from "src/entities/card/Question";
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from "@components/icons/Icon";

type ShortTextCardProps = {
  card: Card;
  onActive: (card: Card) => void;
};

export default function ShortTextCard({ card, onActive }: ShortTextCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [subtitle, setSubtitle] = React.useState(card.subtitle || "");
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard, deleteCard } = useActions("forms");

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
    if (!card.active && modified) {
      // TODO: Update on supabase

      let cardData = card.toOject();
      let questionData = cardData.question;

      questionData.label = label;
      cardData.subtitle = subtitle;

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
    } else if (target === "subtitle") {
      setSubtitle(e.target.value);
    }
  };

  const handleDelete = () => {
    deleteCard({
      folderId: selectedFolder?.id,
      formId: card.formId,
      cardId: card.id,
    });
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
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2
  }
};
