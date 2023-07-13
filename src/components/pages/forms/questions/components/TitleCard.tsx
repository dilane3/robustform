import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Form from "src/entities/form/Form";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";
import Card from "src/entities/card/Card";
import Question from "src/entities/card/Question";

type TitleCardProps = {
  active: boolean;
  form: Form;
  card: Card;
  onActive: (card?: Card) => void;
};

export default function TitleCard({
  active,
  onActive,
  form,
  card,
}: TitleCardProps) {
  const cardActive = form ? active : card.active;
  const cardTitle = form ? form.title : card ? card.title : "";
  const cardDescription = form
    ? form.description
    : card
    ? card.description
    : "";

  // Local state
  const [title, setTitle] = React.useState(cardTitle);
  const [description, setDescription] = React.useState(cardDescription);
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder, forms } = useSignal<FormsState>("forms");

  // Global actions
  const { updateTitleAndDescription, updateCard } = useActions("forms");

  // Memoized values

  const otherFormsFolder = useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

  // Effects

  useEffect(() => {
    if (cardActive) {
      if (title !== cardTitle || description !== cardDescription) {
        setModified(true);
      } else {
        setModified(false);
      }
    }
  }, [title, description]);

  useEffect(() => {
    if (!cardActive && modified) {
      if (form) {
        updateTitleAndDescription({
          formId: form.id,
          folderId: selectedFolder ? selectedFolder.id : otherFormsFolder?.id,
          title,
          description,
        });

        return;
      }

      // TODO: Update on supabase

      let cardData = card.toOject();
      let questionData = cardData.question;

      cardData.title = title;
      cardData.description = description;

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
  }, [cardActive]);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "title") setTitle(e.target.value);
    else if (target === "description") setDescription(e.target.value);
  };

  const handleActive = () => {
    if (form) {
      return onActive();
    }

    return onActive(card);
  };

  return (
    <Box
      sx={cardStyles.container}
      onClick={handleActive}
      className={`${cardActive ? "active" : ""}`}
    >
      {cardActive ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit title card
          </Typography>

          <Input
            size="small"
            value={title}
            variant="standard"
            label="Title"
            styles={{ marginBottom: 2 }}
            onChange={(e) => handleChange(e, "title")}
          />
          <Input
            size="small"
            value={description}
            variant="standard"
            label="Description"
            onChange={(e) => handleChange(e, "description")}
          />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography
            component="h1"
            sx={form ? styles.formTitle : styles.title}
          >
            {cardTitle}
          </Typography>
          <Typography component="span" sx={styles.description}>
            {cardDescription}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

TitleCard.defaultProps = {
  active: false,
  form: null,
  card: null,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
  },

  formTitle: {
    fontSize: "2rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
  },

  description: {
    mt: 1,
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    color: Colors.gray,
  },
};
