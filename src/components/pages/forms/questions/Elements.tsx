import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import React from "react";
import SidenavItem from "@components/pages/dashboard/SidenavItem";
import FolderIcon from "@mui/icons-material/Folder";
import InputRoundedIcon from "@mui/icons-material/InputRounded";
import WrapTextRoundedIcon from "@mui/icons-material/WrapTextRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import Icon from "@components/icons/Icon";

export default function Elements() {
  // Local state
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  return (
    <Box
      sx={styles.container}
      className={`${!isExpanded ? "not-expanded" : ""}`}
    >
      <Box sx={styles.header}>
        <Typography
          variant="h6"
          sx={styles.headerText}
          className={`${!isExpanded ? "not-expanded" : ""}`}
        >
          Elements
        </Typography>

        <Icon
          className={`${!isExpanded ? "not-expanded" : ""}`}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon color="action" />
        </Icon>
      </Box>

      <Box sx={styles.elementsContainer}>
        <SidenavItem
          text={isExpanded ? "Heading" : ""}
          className="not-expanded"
        >
          <TextFieldsOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Short Input" : ""}
          className="not-expanded"
        >
          <InputRoundedIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Long Input" : ""}
          className="not-expanded"
        >
          <WrapTextRoundedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Multi Choice" : ""}
          className="not-expanded"
        >
          <ChecklistRoundedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Unique Choice" : ""}
          className="not-expanded"
        >
          <RadioButtonCheckedOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Choice List" : ""}
          className="not-expanded"
        >
          <FactCheckOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem text={isExpanded ? "Date" : ""} className="not-expanded">
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: 250,
    height: "100%",
    backgroundColor: Colors.background,
    borderRight: 1,
    borderColor: "divider",
    padding: "1rem",
    transition: "width 0.3s ease-in-out",
    overflowY: "auto",

    "&.not-expanded": {
      width: 75,
    },

    [theme.breakpoints.down("md")]: {
      width: 75,
    },
  }),

  header: (theme) => ({
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }),

  headerText: (theme) => ({
    fontFamily: "OutfitMedium",

    "&.not-expanded": {
      display: "none",
    },

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }),

  icon: (theme) => ({
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      backgroundColor: Colors.grayLight,
    },

    "&.not-expanded": {
      transform: "rotate(180deg)",
    },

    [theme.breakpoints.down("md")]: {
      transform: "rotate(180deg)",
      marginLeft: "auto",
    },
  }),

  elementsContainer: (theme) => ({
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",

    [theme.breakpoints.down("md")]: {
      "& .not-expanded": {
        display: "none",
      },
    },
  }),
};
