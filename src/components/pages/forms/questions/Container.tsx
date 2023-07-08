import { Box, SxProps, Theme } from "@mui/material";
import Elements from "./Elements";
import TitleCard from "./components/TitleCard";
import React from "react";
import ShortTextCard from "./components/ShortTextCard";
import LongTextCard from "./components/LongTextCard";
import SubmitCard from "./components/SubmitCard";
import MultiChoiceCard from "./components/MultiChoice";

export default function QuestionContainer() {
  const [active, setActive] = React.useState(false);

  // Handlers
  const handleActive = (value: boolean) => {
    setActive(value);

    console.log(value);
  };

  return (
    <Box sx={styles.container} >
      <Elements />

      <Box sx={styles.formContainer}>
        <Box sx={styles.form}>
          <TitleCard active={active} onActive={() => handleActive(true)} />
          <ShortTextCard active={active} onActive={() => handleActive(true)} />
          <LongTextCard  onActive={() => handleActive(true)} />
          <MultiChoiceCard active={active} onActive={() => handleActive(true)} />
          <SubmitCard />
        </Box>

        <Box sx={styles.bg} onClick={() => handleActive(false)} />
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },

  formContainer: (theme) => ({
    position: "relative",
    width: "calc(100%)",
    height: "100%",
    overflowY: "auto",
  }),

  form: (theme) => ({
    position: "absolute",
    top: 30,
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: "auto",
    mx: "auto",
    // mb: 3,
    borderRadius: 2,
    overflow: "hidden",
    zIndex: 2,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }),

  bg: {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
};
