import Input from "@components/inputs/Input";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { styles as cardStyles } from "@styles/mui-styles/form-card";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type DateCardProps = {
  active: boolean;
  onActive: () => void;
};

export default function DateCard({
  active,
  onActive,
}: DateCardProps) {
  return (
    <Box
      sx={cardStyles.container}
      onClick={onActive}
      className={`${active ? "active" : ""}`}
    >
      {active ? (
        <Box sx={cardStyles.box}>
          <Typography component="h4" sx={cardStyles.editTitle}>
            Edit card
          </Typography>

          <Input
            size="small"
            label="Label"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />

          <Input
            size="small"
            label="Subtitle"
            variant="standard"
            styles={{ marginBottom: 2 }}
          />
        </Box>
      ) : (
        <Box sx={cardStyles.box}>
          <Typography component="h1" sx={cardStyles.label}>
            Votre date de naissance
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
              label="Votre réponse"
              views={['year', 'month', 'day']}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  mb: 1,
                },
                padding: "0.4rem 0"
              }}
            />
          </LocalizationProvider>

          <Typography component="h5" sx={cardStyles.subtitle}>
            Sous titre ici
          </Typography>
        </Box>
      )}
    </Box>
  );
}

DateCard.defaultProps = {
  active: false,
  onActive: () => {},
};

const styles: Record<string, SxProps<Theme>> = {};