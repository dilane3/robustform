import { Box, SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";
import Form from "src/entities/form/Form";

type ResponseContainerProps = {
  form: Form | null;
  isReady: boolean;
};

export default function PublishContainer({
  form,
  isReady,
}: ResponseContainerProps) {
  return <Box sx={styles.container}></Box>;
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 5rem",
    background: Colors.background,

    [theme.breakpoints.down("md")]: {
      padding: "2rem 3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
    },
  }),
};
