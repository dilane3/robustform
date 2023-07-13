import Main from "@components/layout/Main";
import { styles as baseStyles } from "@components/pages/forms/questions/Container";
import ChoiceListCard from "@components/pages/forms/questions/components/ChoiceListCard";
import DateCard from "@components/pages/forms/questions/components/DateCard";
import FooterCard from "@components/pages/forms/questions/components/Footer";
import LongTextCard from "@components/pages/forms/questions/components/LongTextCard";
import MultiChoiceCard from "@components/pages/forms/questions/components/MultiChoice";
import ShortTextCard from "@components/pages/forms/questions/components/ShortTextCard";
import SubmitCard from "@components/pages/forms/questions/components/SubmitCard";
import TitleCard from "@components/pages/forms/questions/components/TitleCard";
import UniqueChoiceCard from "@components/pages/forms/questions/components/UniqueChoice";
import { useActions, useSignal } from "@dilane3/gx";
import { Theme, SxProps, Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Colors } from "src/constants";
import { CardType, QuestionType } from "src/entities/card/type";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";

export default function FormView() {
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

  // Methods
  const renderQuestions = () => {
    if (form) {
      const cardItems: React.ReactNode[] = [];

      for (const card of form.cards) {
        if (card.type === CardType.HEADING) {
          cardItems.push(<TitleCard card={card} />);
        } else {
          switch (card.questionType) {
            case QuestionType.SHORT_TEXT: {
              cardItems.push(<ShortTextCard card={card} />);
              break;
            }

            case QuestionType.LONG_TEXT: {
              cardItems.push(<LongTextCard card={card} />);
              break;
            }

            case QuestionType.MULTIPLE_CHOICE: {
              cardItems.push(<MultiChoiceCard card={card} />);
              break;
            }

            case QuestionType.UNIQUE_CHOICE: {
              cardItems.push(<UniqueChoiceCard card={card} />);
              break;
            }

            case QuestionType.CHOICE_LIST: {
              cardItems.push(<ChoiceListCard card={card} />);
              break;
            }

            case QuestionType.DATE: {
              cardItems.push(<DateCard card={card} />);
              break;
            }
          }
        }
      }

      return cardItems;
    }

    return null;
  };

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
    <>
      <Head>
        <title>{form.title} | Robustform</title>
        <meta name="description" content={form.description} />
      </Head>

      <Main>
        <Box sx={styles.container}>
          <Box sx={styles.formContainer}>
            <Box sx={styles.form}>
              <TitleCard form={form} />

              {renderQuestions()}

              <SubmitCard />
              <FooterCard />
            </Box>
          </Box>
        </Box>
      </Main>
    </>
  );
}

FormView.noLayout = true;

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    backgroundColor: Colors.sidenav,
  }),

  formContainer: (theme) => ({
    width: "calc(100%)",
    height: "100%",
    overflowY: "auto",
    padding: "2rem",

    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  }),

  form: (theme) => ({
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
};
