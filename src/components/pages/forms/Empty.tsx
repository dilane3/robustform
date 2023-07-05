import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import Image from "next/image";

import emptyImage from "src/assets/images/forms.png";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function EmptyForm() {
  return (
    <Box component="section" sx={styles.container}>
      <Image 
        src={emptyImage}
        alt="Empty form"
        width={300}
      />
      <Typography sx={{ fontSize: "1.5rem", fontFamily: "OutfitBold" }}>
        YOU DON'T HAVE ANY FORM
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", fontFamily: "OutfitRegular", mt: 1, color: "#555" }}>
        Yours forms will be here
      </Typography>

      <Button styles={{ borderRadius: 3, width: "auto", mt: 2, height: 40 }}>
        <AddCircleIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
        <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
          Create new form
        </Typography>
      </Button>
    </Box>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
}