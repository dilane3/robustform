import { Box, SxProps, Theme } from "@mui/material"
import Elements from "./Elements"

export default function QuestionContainer() {
  return (
    <Box sx={styles.container}>
      <Elements />

      <Box sx={styles.formContainer}></Box>
    </Box>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },

  formContainer: (theme) => ({
    width: "calc(100% - 250px)",
    height: "100%",
  }),
}