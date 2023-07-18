import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import Button from "@components/buttons/Button";

type SubmitCardProps = {
  disabled: boolean;
  loading?: boolean;
  onSubmit: () => void;
};

export default function SubmitCard({
  disabled,
  loading,
  onSubmit,
}: SubmitCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      style={{
        backgroundColor: "transparent",
        padding: "1rem 0",
        border: "none",
      }}
    >
      <Box sx={cardStyles.box}>
        <Button
          styles={{ width: 120, height: 40 }}
          onClick={onSubmit}
          disabled={disabled || loading}
        >
          <Typography sx={styles.text}>
            {loading ? "SENDING..." : "SUBMIT"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

SubmitCard.defaultProps = {
  loading: false,
  disabled: false,
  onSubmit: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  text: {
    fontFamily: "OutfitMedium",
    fontSize: "1rem",
  },
};
