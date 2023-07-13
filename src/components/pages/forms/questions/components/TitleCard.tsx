import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Form from "src/entities/form/Form";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";

type TitleCardProps = {
  active: boolean;
  form: Form;
  onActive: () => void;
};

export default function TitleCard({ active, onActive, form }: TitleCardProps) {
  // Local state
  const [title, setTitle] = React.useState(form.title);
  const [description, setDescription] = React.useState(form.description);
  const [modified, setModified] = React.useState(false);

  // Global state
  const { selectedFolder, forms } = useSignal<FormsState>("forms");

  // Global actions
  const { updateTitleAndDescription } = useActions("forms");

  // Memoized values

  const otherFormsFolder = useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

  // Effects

  useEffect(() => {
    if (active) {
      if (title !== form.title || description !== form.description) {
        setModified(true);
      } else {
        setModified(false);
      }
    }
  }, [title, description]);

  useEffect(() => {
    if (!active && modified) {
      updateTitleAndDescription({
        formId: form.id,
        folderId: selectedFolder ? selectedFolder.id : otherFormsFolder?.id,
        title,
        description,
      });
    } else {
      console.log("dont save");
    }
  }, [active]);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "title") setTitle(e.target.value);
    else if (target === "description") setDescription(e.target.value);
  };

  return (
    <Box
      sx={cardStyles.container}
      onClick={onActive}
      className={`${active ? "active" : ""}`}
    >
      {active ? (
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
          <Typography component="h1" sx={styles.title}>
            {form.title}
          </Typography>
          <Typography component="span" sx={styles.description}>
            {form.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

TitleCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  title: {
    fontSize: "1.5rem",
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
