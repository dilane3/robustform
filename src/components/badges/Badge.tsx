import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";

type BadgeProps = {
  text: string;
  color: string;
  textColor: string;
};

export default function Badge({ text, color, textColor }: BadgeProps) {
  return (
    <Box component="div" sx={styles.badge} style={{ backgroundColor: color }}>
      <Typography
        sx={{
          color: textColor,
          fontSize: "1rem",
          fontFamily: "OutfitBold",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

Badge.defaultProps = {
  color: Colors.grayLight,
  textColor: Colors.black,
};

const styles: Record<string, SxProps<Theme>> = {
  badge: {
    width: "auto",
    height: "auto",
    padding: "0.3rem 1rem",
    borderRadius: 5,
  },
};
