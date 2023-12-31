import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import Image from "next/image";

import emptyImage from "src/assets/images/forms.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useActions } from "@dilane3/gx";
import { ModalType } from "src/gx/signals";

export default function EmptyForm() {
  // Global state
  const { open } = useActions("modal");

  // Handlers

  const handleOpenCreateForm = () => {
    open(ModalType.CREATE_FORM);
  };

  return (
    <Box component="section" sx={styles.container}>
      <Image src={emptyImage} alt="Empty form" width={300} />
      <Typography sx={styles.title}>
        YOU DON'T HAVE ANY FORM
      </Typography>
      <Typography
        sx={styles.description}
      >
        Yours forms will be here
      </Typography>

      <Button
        styles={{ borderRadius: 3, width: "auto", mt: 2, height: 40 }}
        onClick={handleOpenCreateForm}
      >
        <AddCircleIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
        <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
          Create new form
        </Typography>
      </Button>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      padding: "0 1rem",

      "& > img": {
        width: 200,
        height: "auto"
      }
    }
  }),

  title: (theme) => ({ 
    fontSize: "1.5rem", 
    fontFamily: "OutfitBold",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    }
  }),

  description: (theme) => ({
    fontSize: "1.2rem",
    fontFamily: "OutfitRegular",
    mt: 1,
    color: "#555",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    }
  })
};
