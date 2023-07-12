import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import { useActions, useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Colors } from "src/constants";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";
import { styles as baseStyles } from "src/styles/mui-styles/form-card";

export default function CreateForm() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  const { close } = useActions("modal");
  const { addForm } = useActions("forms");

  // Local state
  const [title, setTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Memoized values
  const otherFormsFolder = useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

  // Handlers

  /**
   * Handle name change
   * @param e
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "title") setTitle(e.target.value);
    else if (target === "description") SetDescription(e.target.value);
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    if (loading) return;

    // TODO: Create folder on Supabase

    // Create folder on global
 
    // Generate form id as number randomly
    const folderId = selectedFolder ? selectedFolder.id : otherFormsFolder?.id;
    const formId = Math.floor(Math.random() * 1000000000);
    const formTitle = title === "" ? "Untitled form" : title;

    const form = new Form({
      id: formId,
      title: formTitle,
      description,
      folderId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "1",
    });

    console.log({ form })

    addForm({ folderId, form });

    // Close modal
    close();
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.title}>
        Create Form
      </Typography>

      <Box sx={baseStyles.box}>
        <Input
          label="Title"
          size="small"
          styles={{ mb: 2 }}
          value={title}
          onChange={(e) => handleChange(e, "title")}
        />

        <Input
          label="Description"
          size="small"
          styles={{ mb: 2 }}
          value={description}
          onChange={(e) => handleChange(e, "description")}
        />
      </Box>

      <Box sx={baseStyles.boxRow}>
        <Button
          styles={{
            backgroundColor: Colors.sidenav,
            height: 40,
            width: 120,
            "&:hover": {
              backgroundColor: Colors.grayLight,
            },
          }}
          onClick={close}
        >
          <Typography
            sx={{
              color: Colors.black,
              fontSize: "1rem",
              fontFamily: "OutfitMedium",
            }}
          >
            Cancel
          </Typography>
        </Button>

        <Button
          styles={{
            backgroundColor: Colors.primary,
            height: 40,
            width: "calc(100% - 140px)",
            ml: "auto",
          }}
          disabled={loading}
          onClick={handleSubmit}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontFamily: "OutfitMedium",
            }}
          >
            Create
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: 400,
    height: "auto",
  },

  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitBold",
    textAlign: "center",
    mb: 4,
  },
};
