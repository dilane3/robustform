import Input from "@components/inputs/Input";
import {
  Box,
  SxProps,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Card from "src/entities/card/Card";
import { FormsState } from "src/gx/signals";
import { useActions, useSignal } from "@dilane3/gx";
import Question from "src/entities/card/Question";
import Icon from "@components/icons/Icon";
import DeleteIcon from '@mui/icons-material/Delete';
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";

type LongTextCardProps = {
  card: Card;
  values: string[];
  onActive: (card: Card) => void;
  onAddResponse: (values: string[]) => void;
};

export default function LongTextCard({ card, values, onActive, onAddResponse }: LongTextCardProps) {
  // Local state
  const [label, setLabel] = React.useState(card.question.label || "");
  const [subtitle, setSubtitle] = React.useState(card.subtitle || "");
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder, forms } = useSignal<FormsState>("forms");

  // Global action
  const { updateCard, deleteCard } = useActions("forms");

  // Memoized values

  const otherFormsFolder = useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

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
        folderId: selectedFolder ? selectedFolder.id : otherFormsFolder?.id,
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
      folderId: selectedFolder ? selectedFolder.id : otherFormsFolder?.id,
      formId: card.formId,
      cardId: card.id,
    });
  };

  const handleAddResponse = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onAddResponse([e.target.value]);
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
              Edit long text card
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

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Your answer"
            style={styles.textarea as React.CSSProperties}
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

LongTextCard.defaultProps = {
  active: false,
  values: [],
  onActive: () => {},
  onAddResponse: () => {},
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

  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2
  }
};
