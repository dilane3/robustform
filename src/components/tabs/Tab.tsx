import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab as BaseTab, SxProps, Theme  } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import QuestionsContainer from "../pages/forms/questions/Container";
import ResponseContainer from "@components/pages/forms/responses/Container";
import { useRouter } from "next/router";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Form from "src/entities/form/Form";
import PublishContainer from "@components/pages/forms/publish/Container";

export default function Tab() {
  const [value, setValue] = React.useState("1");

  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

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
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  return (
    <>
      <TabContext value={value}>
        <Box component="section" sx={styles.container}>
          <Box sx={styles.tabHeader}>
            <TabList onChange={handleChange} aria-label="navigation tab">
              <BaseTab label="Questions" value="1" sx={{ fontFamily: "OutfitMedium" }} />
              <BaseTab label="Responses" value="2" sx={{ fontFamily: "OutfitMedium" }} />
              <BaseTab label="Publish" value="3" sx={{ fontFamily: "OutfitMedium" }} />
            </TabList>
          </Box>

          <Box component="section" sx={styles.tabBody}>
            <TabPanel value="1" sx={{ height: '100%', padding: "0" }}>
              <QuestionsContainer form={form} isReady={isReady} />
            </TabPanel>
            <TabPanel value="2" sx={{ height: '100%', padding: "0" }}>
              <ResponseContainer form={form} isReady={isReady} />
            </TabPanel>
            <TabPanel value="3" sx={{ height: '100%', padding: "0" }}>
              <PublishContainer form={form} isReady={isReady} />
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  tabHeader: {
    width: "100%",
    borderBottom: 1,
    borderColor: "divider",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  tabBody: {
    backgroundColor: Colors.sidenav,
    width: "100%",
    height: "100%",
  }
}