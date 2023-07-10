import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import { useActions } from "@dilane3/gx";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import { styles as baseStyles } from "src/styles/mui-styles/form-card";

export default function CreateForm() {
  // Global state
  const { close } = useActions("modal");

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.title}>
        Create Form
      </Typography>

      <Box sx={baseStyles.box}>
        <Input label="Title" size="small" styles={{ mb: 2 }} value="arbre" />

        <Input label="Description" size="small" styles={{ mb: 2 }} />
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
          disabled
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
