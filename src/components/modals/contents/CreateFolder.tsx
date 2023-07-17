import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import { useActions, useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import folderProvider from "src/api/folders";
import { Colors } from "src/constants";
import Folder from "src/entities/form/Folder";
import { FormsState } from "src/gx/signals";
import { styles as baseStyles } from "src/styles/mui-styles/form-card";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
});

export default function CreateFolder() {
  // Global state
  const { forms } = useSignal<FormsState>("forms");

  const { close } = useActions("modal");
  const { addFolder } = useActions("forms");

  // Local state
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Effects

  useEffect(() => {
    const formVerification = async () => {
      await validate();
    };

    formVerification();
  }, [name]);

  // Handlers

  /**
   * Handle name change
   * @param e
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  /**
   * Handle submit
   */
  const handleSubmit = async () => {
    if (!verified || loading) return;

    setLoading(true);

    const { success, data } = await folderProvider.create({ name });

    setLoading(false);

    if (success) {
      // Create folder on global
      const folder = new Folder({ id: data.id, name });

      addFolder(folder);
  
      // Close modal
      close();
    } else {}
  };

  /**
   * Validate form
   */
  const validate = async () => {
    try {
      await schema.validate({ name });

      setVerified(true);
    } catch (error) {
      console.log(error);

      setVerified(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    close();
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.title}>
        Create Folder
      </Typography>

      <Box sx={baseStyles.box}>
        <Input
          label="Name"
          size="small"
          value={name}
          onChange={handleNameChange}
          styles={{ mb: 2 }}
          autoFocus
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
          onClick={handleSubmit}
          disabled={!verified || loading}
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
