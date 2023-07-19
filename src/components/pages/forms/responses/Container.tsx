import { Box, SxProps, Theme } from "@mui/material";

export default function ResponseContainer() {
  return (
    <Box sx={styles.container}>
      Yess
    </Box>
  )
}

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
};