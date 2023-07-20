import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import React, { useMemo } from "react";
import SidenavItem from "@components/pages/dashboard/SidenavItem";
import InputRoundedIcon from "@mui/icons-material/InputRounded";
import WrapTextRoundedIcon from "@mui/icons-material/WrapTextRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import Icon from "@components/icons/Icon";
import { CardType, QuestionType } from "src/entities/card/type";
import Card from "src/entities/card/Card";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import { OTHERS_FORMS_FOLDER_ID } from "src/gx/signals/forms/constants";
import questionProvider from "src/api/questions";
import Folder from "src/entities/form/Folder";

type ElementsProps = {
  formId: number;
  folderId?: number;
  style?: any
};

export default function Elements({ formId, folderId, style }: ElementsProps) {
  // Local state
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  const { forms } = useSignal<FormsState>("forms");

  // Global actions
  const { addCard, updateCard } = useActions("forms");

  // Memoized values
  const form = useMemo(() => {
    const folder: Folder | undefined = forms.find((f) => f.id === folderId);

    console.log(folder, formId)

    if (!folder) return null;

    return folder.forms.find((f) => f.id === formId);
  }, [JSON.stringify(forms)]);

  // Handlers
  const handleSelectCard = async (elementType: QuestionType) => {
    console.log(form, folderId)
    if (!form) return;

    const cardId = Math.floor(Math.random() * 1000000000) + 2;
    const cardType =
      elementType === QuestionType.HEADING
        ? CardType.HEADING
        : CardType.QUESTION;

    const cardPayload = {
      id: cardId,
      formId,
      type: cardType,
      questionType: elementType,
      createdAt: new Date(Date.now()),
      position: form.cards.length + 1,
      active: true,
    };

    const card = new Card(cardPayload);

    console.log({ folderId, formId, card })

    // Add card to global state
    addCard({
      folderId,
      formId,
      card,
    });

    // Add card (question) to supabase
    const { success, data } = await questionProvider.create({
      type: cardType,
      questionType: elementType,
      formId,
      position: form.cards.length + 1,
    });

    if (success && data) {
      // Update card id
      card.id = data.id;

      // Update card on global state
      updateCard({
        folderId,
        formId,
        card,
      });
    } else {
      console.log("card not created");
    }
  };

  return (
    <Box
      sx={styles.container}
      className={`${!isExpanded ? "not-expanded" : ""}`}
      style={style}
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
          className={`can-rotate ${!isExpanded ? "not-expanded" : ""}`}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon color="action" />
        </Icon>
      </Box>

      <Box sx={styles.elementsContainer}>
        <SidenavItem
          text={isExpanded ? "Heading" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.HEADING)}
          title="Heading"
        >
          <TextFieldsOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Short Text" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.SHORT_TEXT)}
          title="Short Text"
        >
          <InputRoundedIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Long Text" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.LONG_TEXT)}
          title="Long Text"
        >
          <WrapTextRoundedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Multi Choice" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.MULTIPLE_CHOICE)}
          title="Multi Choice"
        >
          <ChecklistRoundedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Unique Choice" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.UNIQUE_CHOICE)}
          title="Unique Choice"
        >
          <RadioButtonCheckedOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Choice List" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.CHOICE_LIST)}
          title="Choice List"
        >
          <FactCheckOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>

        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
        <SidenavItem
          text={isExpanded ? "Date" : ""}
          className="not-expanded"
          onClick={() => handleSelectCard(QuestionType.DATE)}
          title="Date"
        >
          <CalendarMonthOutlinedIcon
            sx={{ fontSize: "1.5rem", mr: 2 }}
            color="action"
          />
        </SidenavItem>
      </Box>
    </Box>
  );
}

Elements.defaultProps = {
  formId: OTHERS_FORMS_FOLDER_ID,
  style: {},
};

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
