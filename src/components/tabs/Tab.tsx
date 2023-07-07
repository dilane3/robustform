import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab as BaseTab, SxProps, Theme  } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import QuestionsContainer from "../pages/forms/questions/Container";

export default function Tab() {
  const [value, setValue] = React.useState("1");

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
              <QuestionsContainer />
            </TabPanel>
            <TabPanel value="2" sx={{ height: '100%', padding: "0" }}>Item Two</TabPanel>
            <TabPanel value="3" sx={{ height: '100%', padding: "0" }}>Item Three</TabPanel>
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