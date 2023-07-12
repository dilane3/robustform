import { Box, SxProps, Theme, Typography } from "@mui/material";
import Elements from "./Elements";
import TitleCard from "./components/TitleCard";
import React, { useEffect } from "react";
import ShortTextCard from "./components/ShortTextCard";
import LongTextCard from "./components/LongTextCard";
import SubmitCard from "./components/SubmitCard";
import MultiChoiceCard from "./components/MultiChoice";
import UniqueChoiceCard from "./components/UniqueChoice";
import ChoiceListCard from "./components/ChoiceListCard";
import DateCard from "./components/DateCard";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Form from "src/entities/form/Form";
import { NavigateToResource } from "@refinedev/nextjs-router";
import Link from "next/link";

export default function QuestionContainer() {
  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

  // Local state
  const [active, setActive] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  // Memoized values
  const form = React.useMemo(() => {
    if (!id) return null;

    let form: Form | null = null;

    for (let folder of forms) {
      for (let f of folder.forms) {
        if (f.id === +id) {
          form = f;
        }
      }
    }

    return form;
  }, [JSON.stringify(forms)]) as Form | null;

  // Handlers
  const handleActive = (value: boolean) => {
    setActive(value);
  };

  // Render

  if (isReady && !form) {
    return (
      <Link href="/forms">
        <Typography sx={{ fontFamily: "OutfitRegular", fontSize: "1rem" }}>
          Go back
        </Typography>
      </Link>
    );
  }

  if (!isReady || !form) return null;

  return (
    <Box sx={styles.container}>
      <Elements />

      <Box sx={styles.formContainer}>
        <Box sx={styles.form}>
          <TitleCard
            active={active}
            onActive={() => handleActive(true)}
            form={form}
          />
          <ShortTextCard active={active} onActive={() => handleActive(true)} />
          <LongTextCard onActive={() => handleActive(true)} />
          <MultiChoiceCard
            active={active}
            onActive={() => handleActive(true)}
          />
          <UniqueChoiceCard
            active={active}
            onActive={() => handleActive(true)}
          />
          <ChoiceListCard active={active} onActive={() => handleActive(true)} />
          <DateCard onActive={() => handleActive(true)} />
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
