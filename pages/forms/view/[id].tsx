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
import responseProvider from "src/api/responses";
import { Colors } from "src/constants";
import { CardType, QuestionType } from "src/entities/card/type";
import Form from "src/entities/form/Form";
import Response from "src/entities/response/Response";
import ResponseItem from "src/entities/response/ResponseItem";
import { FormsState } from "src/gx/signals";
import { AuthState } from "src/gx/signals/auth";

export default function FormView() {
  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

  // Local state
  const [response, setResponse] = React.useState<Response | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  // Global state
  const { forms } = useSignal<FormsState>("forms");
  const { user } = useSignal<AuthState>("auth");

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

  // Effects

  React.useEffect(() => {
    if (form) {
      // Generate responseItems
      const responseItems: ResponseItem[] = [];

      for (const card of form.cards) {
        if (card.type !== CardType.HEADING) {
          const responseItem = new ResponseItem({
            id: Math.floor(Math.random() * 1000000000),
            questionId: card.id,
            values: [],
          });

          responseItems.push(responseItem);
        }
      }

      // generate random id as number
      const id = Math.floor(Math.random() * 1000000000);

      const response = new Response({
        id,
        formId: form.id,
        responseItems,
      });

      setResponse(response);
    }
  }, [form]);

  // Handlers

  const handleAddResponse = (questionId: number, values: string[]) => {
    if (response) {
      const responseClone = Response.fromObject(response.toObject());

      // Verify if the answer to the question already exists
      const responseItemIndex = responseClone.responseItems.findIndex(
        (item) => item.questionId === questionId
      );

      if (responseItemIndex !== -1) {
        responseClone.responseItems[responseItemIndex].values = values;

        setResponse(responseClone);
      }
    }
  };

  const handleSubmit = async () => {
    if (response) {
      const isValid = validate();

      if (isValid) {
        setLoading(true);

        const responseClone = Response.fromObject(response.toObject());

        // Prepare the creation of response into supabase;
        const { data } = await responseProvider.createReponse({
          formId: responseClone.formId,
        });

        if (data) {
          for (let index in responseClone.responseItems) {
            const responseItem = responseClone.responseItems[index];

            const { data: responseItemData } =
              await responseProvider.createReponseItem({
                values: responseItem.values,
                questionId: responseItem.questionId,
                responseId: data.id,
              });

            if (responseItemData) {
              responseClone.responseItems[index].id = responseItemData.id;

              responseClone.id = data.id;
              responseClone.createdAt = new Date(data.created_at);
            }
          }

          setLoading(false);
          setSubmitted(true);

          if (user && form) {
            if (user.id === form.ownerId) {
              // TO DO: Add the new response into the global state
              console.log(responseClone);
            }
          }
        }
      }
    }
  };

  const validate = () => {
    let isVerified = true;

    if (response) {
      for (const responseItem of response.responseItems) {
        if (responseItem.values.length === 0 || responseItem.values[0] === "") {
          isVerified = false;

          break;
        }
      }
    }

    return isVerified;
  };

  // Methods
  const renderQuestions = () => {
    if (form && response) {
      const cardItems: React.ReactNode[] = [];

      for (const card of form.cards) {
        if (card.type === CardType.HEADING) {
          cardItems.push(<TitleCard card={card} />);
        } else {
          // Get responseItem
          const responseItem: ResponseItem | undefined =
            response.responseItems.find((item) => item.questionId === card.id);

          if (responseItem) {
            switch (card.questionType) {
              case QuestionType.SHORT_TEXT: {
                cardItems.push(
                  <ShortTextCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }

              case QuestionType.LONG_TEXT: {
                cardItems.push(
                  <LongTextCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }

              case QuestionType.MULTIPLE_CHOICE: {
                cardItems.push(
                  <MultiChoiceCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }

              case QuestionType.UNIQUE_CHOICE: {
                cardItems.push(
                  <UniqueChoiceCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }

              case QuestionType.CHOICE_LIST: {
                cardItems.push(
                  <ChoiceListCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }

              case QuestionType.DATE: {
                cardItems.push(
                  <DateCard
                    card={card}
                    values={responseItem.values}
                    onAddResponse={(values: string[]) =>
                      handleAddResponse(card.id, values)
                    }
                  />
                );
                break;
              }
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

              <SubmitCard
                onSubmit={handleSubmit}
                disabled={!validate()}
                loading={loading}
              />
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
