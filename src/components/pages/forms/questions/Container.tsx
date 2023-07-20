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
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState } from "src/gx/signals";
import Form from "src/entities/form/Form";
import Link from "next/link";
import { CardType, QuestionType } from "src/entities/card/type";
import Card from "src/entities/card/Card";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";
import Image from "next/image";
import { Colors } from "src/constants";
import notFoundImage from "src/assets/images/notfound.png";
import Button from "@components/buttons/Button";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import NotFoundForm from "./NotFound";
import { authProvider } from "src/authProvider";
import Icon from "@components/icons/Icon";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

type QuestionContainerProps = {
  form: Form | null;
  isReady: boolean;
};

export default function QuestionContainer({
  form,
  isReady,
}: QuestionContainerProps) {
  // Local state
  const [active, setActive] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  const { setCardActive, setAllCardsInactive } = useActions("forms");

  const otherFormsFolder = React.useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

  React.useEffect(() => {
    const check = async () => {
      const response = await authProvider.check();
    };

    check();
  }, []);

  // Handlers
  const handleGlobalActive = (card?: Card) => {
    if (active) setActive(false);

    if (card) {
      setCardActive({
        folderId: form?.folderId ? form?.folderId : otherFormsFolder?.id,
        formId: card.formId,
        cardId: card.id,
      });
    }
  };

  const handleActive = (active: boolean) => {
    setAllCardsInactive({
      folderId: form?.folderId ? form?.folderId : otherFormsFolder?.id,
      formId: form?.id,
    });

    setActive(active);
  };

  const handleDesactivateAll = () => {
    setActive(false);
    setAllCardsInactive({
      folderId: form?.folderId ? form?.folderId : otherFormsFolder?.id,
      formId: form?.id,
    });
  };

  // Methods
  const renderQuestions = () => {
    if (form) {
      const cardItems: React.ReactNode[] = [];

      for (const card of form.cards) {
        if (card.type === CardType.HEADING) {
          cardItems.push(
            <TitleCard
              key={card.id}
              active={active}
              onActive={handleGlobalActive}
              card={card}
              folderId={form?.folderId}
            />
          );
        } else {
          switch (card.questionType) {
            case QuestionType.SHORT_TEXT: {
              cardItems.push(
                <ShortTextCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.LONG_TEXT: {
              cardItems.push(
                <LongTextCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.MULTIPLE_CHOICE: {
              cardItems.push(
                <MultiChoiceCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.UNIQUE_CHOICE: {
              cardItems.push(
                <UniqueChoiceCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.CHOICE_LIST: {
              cardItems.push(
                <ChoiceListCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.DATE: {
              cardItems.push(
                <DateCard
                  key={card.id}
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }
          }
        }
      }

      return cardItems;
    }

    return null;
  };

  // Render

  const renderContent = () => {
    if (isReady && !form) {
      return (
          <NotFoundForm />
      );
    }

    if (!isReady || !form) return null;

    return (
      <>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        >
          <Elements
            formId={form?.id}
            folderId={form?.folderId || otherFormsFolder?.id}
          />
        </Box>

        <Box
          sx={styles.elementFloatIcon}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon
            color="action"
            className={isExpanded ? "expanded" : ""}
          />
        </Box>

        <Box
          sx={(theme) => ({
            display: "none",
            position: "absolute",
            top: 60,
            left: 10,
            width: 80,
            height: 250,
            overflowY: "auto",
            borderRadius: 2,
            zIndex: 10,

            // transitions
            transition: "all 0.3s ease-in-out",
            transform: isExpanded ? "translateX(0)" : "translateX(-120%)",

            [theme.breakpoints.down("sm")]: {
              display: "block",
            },
          })}
        >
          <Elements
            formId={form?.id}
            folderId={form?.folderId || otherFormsFolder?.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        <Box sx={styles.formContainer}>
          <Box sx={styles.form}>
            <TitleCard
              active={active}
              onActive={() => handleActive(true)}
              form={form}
              folderId={form?.folderId}
            />

            {renderQuestions()}

            <SubmitCard />
          </Box>

          <Box sx={styles.bg} onClick={handleDesactivateAll} />
        </Box>
      </>
    );
  };

  return <Box sx={styles.container}>{renderContent()}</Box>;
}

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    overflowY: "auto",
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
    maxWidth: 600,
    width: "calc(100% - 20px)",
    height: "auto",
    mx: "auto",
    borderRadius: 2,
    overflow: "hidden",
    zIndex: 2,

    [theme.breakpoints.down("sm")]: {
      top: 60,
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

  centeredBox: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  }),

  elementFloatIcon: (theme) => ({
    display: "none",
    position: "absolute",
    top: 10,
    left: 25,
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",

    "& .MuiSvgIcon-root": {
      transform: "rotate(180deg)",
      transition: "all 0.3s ease-in-out",
    },

    "& .expanded": {
      transform: "rotate(0deg)",
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  }),
};
