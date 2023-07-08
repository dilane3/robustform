import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";

export default function SubmitCard() {
  return (
    <Box sx={cardStyles.container} style={{ backgroundColor: "transparent", padding: "1rem 0" }}>
      <Box sx={cardStyles.box}>
        <Button styles={{ width: 120, height: 40 }}>
          <Typography sx={styles.text}>Submit</Typography>
        </Button>
      </Box>
    </Box>
  );
}

SubmitCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  text: {
    fontFamily: "OutfitMedium",
    fontSize: "1rem",
  }
};
