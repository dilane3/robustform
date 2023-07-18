import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Form from "src/entities/form/Form";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import { OTHERS_FORMS_FOLDER_ID } from "src/gx/signals/forms/constants";
import Card from "src/entities/card/Card";
import Question from "src/entities/card/Question";
import Icon from "@components/icons/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import formProvider from "src/api/forms";

type TitleCardProps = {
  active: boolean;
  form: Form;
  card: Card;
  folderId: number | null;
  onActive: (card?: Card) => void;
};

export default function TitleCard({
  active,
  onActive,
  folderId,
  form,
  card,
}: TitleCardProps) {
  const cardActive = form ? active : card ? card.active : false;
  const cardTitle = form ? form.title : card ? card.title : "Title";
  const cardDescription = form
    ? form.description
    : card
    ? card.description
    : "Description";

  // Local state
  const [title, setTitle] = React.useState(cardTitle);
  const [description, setDescription] = React.useState(cardDescription);
  const [modified, setModified] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  // Global actions
  const {
    updateTitleAndDescription,
    updateCard,
    deleteCard,
    setUpdateProcess,
  } = useActions("forms");

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
    const updateForm = async () => {
      await handleUpdateForm();
    };

    if (!cardActive && modified) {
      updateForm();

      setModified(false);
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

  const handleDelete = () => {
    deleteCard({
      folderId,
      formId: card.formId,
      cardId: card.id,
    });
  };

  const handleUpdateForm = async () => {
    if (form) {
      // Update title and description on global state
      updateTitleAndDescription({
        formId: form.id,
        folderId,
        title,
        description,
      });

      // Update title and description on supabase
      setUpdateProcess({ loading: true });

      const { success } = await formProvider.update({
        title,
        description,
        id: form.id,
      });

      setUpdateProcess({ loading: false, status: success });

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
      folderId,
      formId: card.formId,
      card: myCard,
    });
  };

  return (
    <Box
      sx={cardStyles.container}
      onClick={handleActive}
      className={`${cardActive ? "active" : ""}`}
      style={{
        borderTop: `${form ? "10" : "5"}px solid ${
          form ? Colors.primary : "ihnerit"
        }`,
      }}
    >
      {cardActive ? (
        <Box sx={cardStyles.box}>
          <Box sx={styles.boxRowBetween}>
            <Typography component="h4" sx={cardStyles.editTitle}>
              Edit title card
            </Typography>

            {card && (
              <Icon onClick={handleDelete}>
                <DeleteIcon sx={{ color: Colors.red }} />
              </Icon>
            )}
          </Box>

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
        <>
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

          {form && (
            <Box
              sx={cardStyles.box}
              style={{
                borderTop: "1px solid #eee",
                marginTop: "20px",
                paddingTop: 15,
              }}
            >
              <Typography component="span" sx={styles.requirement}>
                All questions with (*) are required.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

TitleCard.defaultProps = {
  active: false,
  form: null,
  card: null,
  folderId: OTHERS_FORMS_FOLDER_ID,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitMedium",
    color: Colors.black,
  },

  formTitle: {
    fontSize: "2rem",
    fontFamily: "OutfitMedium",
    color: Colors.black,
    lineHeight: 1.4,
  },

  description: {
    mt: 3,
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    color: Colors.gray,
  },

  requirement: {
    fontSize: "0.9rem",
    fontFamily: "OutfitRegular",
    color: Colors.red,
  },

  boxRowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
};
