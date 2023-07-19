import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import { useActions, useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import formProvider from "src/api/forms";
import { Colors } from "src/constants";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";
import { AuthState } from "src/gx/signals/auth";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";
import { styles as baseStyles } from "src/styles/mui-styles/form-card";

export default function CreateForm() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");
  const { user } = useSignal<AuthState>("auth");

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
  const handleSubmit = async () => {
    if (loading || !user) return;

    setLoading(true);

    // Create form on supabase
    const { data, error } = await formProvider.create({
      title,
      description,
      folder_id: selectedFolder ? selectedFolder.id : null,
      user_id: user.id,
    })

    setLoading(false);

    if (data) {
      const folderId = selectedFolder ? selectedFolder.id : otherFormsFolder?.id;
      const formTitle = title === "" ? "Untitled form" : title;
  
      const form = new Form({
        id: data.id,
        title: formTitle,
        description,
        folderId,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: user.id,
        key: data.form_key,
      });
  
      // Add form to global state
      addForm({ folderId, form });
  
      // Close modal
      close();
    } else {}
  };

  const handleClose = () => {
    if (loading) return;

    close();
  }

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
          onClick={handleClose}
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
            {
              loading ? "Loading..." : "Create"
            }
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: 400,
    height: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "auto !important",
    }
  }),

  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitBold",
    textAlign: "center",
    mb: 4,
  },
};
