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
import { NavigateToResource } from "@refinedev/nextjs-router";
import Link from "next/link";
import { CardType, QuestionType } from "src/entities/card/type";
import Card from "src/entities/card/Card";
import { OTHERS_FORMS_FOLDER } from "src/gx/signals/forms/constants";

export default function QuestionContainer() {
  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

  // Local state
  const [active, setActive] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");

  const { setCardActive, setAllCardsInactive } = useActions("forms");

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

  const otherFormsFolder = React.useMemo(() => {
    return forms.find((folder) => folder.name === OTHERS_FORMS_FOLDER);
  }, [forms]);

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
                  card={card}
                  folderId={form?.folderId}
                  onActive={handleGlobalActive}
                />
              );
              break;
            }

            case QuestionType.DATE: {
              cardItems.push(
                <DateCard card={card} folderId={form?.folderId} onActive={handleGlobalActive} />
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
      <Elements
        formId={form.id}
        folderId={form.folderId || otherFormsFolder?.id}
      />

      <Box sx={styles.formContainer}>
        <Box sx={styles.form}>
          <TitleCard
            active={active}
            onActive={() => handleActive(true)}
            form={form}
          />

          {renderQuestions()}

          <SubmitCard />
        </Box>

        <Box sx={styles.bg} onClick={handleDesactivateAll} />
      </Box>
    </Box>
  );
}

export const styles: Record<string, SxProps<Theme>> = {
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
