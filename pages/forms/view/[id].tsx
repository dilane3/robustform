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
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import formProvider from "src/api/forms";
import questionProvider from "src/api/questions";
import responseProvider from "src/api/responses";
import { Colors } from "src/constants";
import Card from "src/entities/card/Card";
import Question from "src/entities/card/Question";
import { CardType, QuestionType } from "src/entities/card/type";
import Form from "src/entities/form/Form";
import Response from "src/entities/response/Response";
import ResponseItem from "src/entities/response/ResponseItem";
import { FormsState } from "src/gx/signals";
import { AuthState } from "src/gx/signals/auth";
import {
  FOLDER_BIN_ID,
  OTHERS_FORMS_FOLDER_ID,
} from "src/gx/signals/forms/constants";

import formSubmittedImage from "src/assets/images/submit2.png";
import notFoundImage from "src/assets/images/notfound.png";
import Button from "@components/buttons/Button";
import HomeIcon from "@mui/icons-material/Home";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

export default function FormView() {
  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

  const formKey = useSearchParams().get("key");

  // Local state
  const [form, setForm] = React.useState<Form | null>(null);
  const [response, setResponse] = React.useState<Response | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [charging, setCharging] = React.useState(true);

  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Effects

  React.useEffect(() => {
    const fetchForm = async () => {
      const { data } = await formProvider.findOneByKey(formKey as string);

      if (data) {
        const { data: questionsData, error } = await questionProvider.findAll(
          data.id
        );

        // Create a form entity
        const folderId = data.folder_id
          ? data.folder_id
          : data.deleted === true
          ? FOLDER_BIN_ID // Deleted folder
          : OTHERS_FORMS_FOLDER_ID; // Default folder

        // Prepare questions
        const cards: Card[] = [];

        if (questionsData) {
          for (const q of questionsData) {
            const question = new Question({
              label: q.title,
              options: q.options,
            });

            const cardPayload = {
              id: q.id,
              title: q.title,
              description: q.description,
              formId: q.form_id,
              type: q.type,
              questionType: q.question_type,
              createdAt: new Date(q.created_at),
              position: q.position,
              question,
              active: false,
            };

            const card = new Card(cardPayload);

            cards.push(card);
          }
        }

        const form = new Form({
          id: data.id,
          title: data.title,
          description: data.description,
          folderId,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at || data.created_at),
          ownerId: data.user_id,
          cards,
          key: data.form_key,
        });

        setForm(form);
        setCharging(false);
      }
    };

    if (formKey) {
      fetchForm();
    }
  }, [formKey]);

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

  const renderContent = () => {
    if (isReady && !form) {
      return (
        <Box sx={styles.centeredBox}>
          <Image alt="form submitted" src={notFoundImage} width={250} />

          <Typography
            sx={{ fontFamily: "OutfitBold", fontSize: "1.5rem", mt: 2 }}
          >
            Form not found
          </Typography>

          <Typography
            sx={{ fontFamily: "OutfitRegular", fontSize: "1rem", mt: 2 }}
          >
            The form you are looking for does not exist or the link has expired.
          </Typography>
        </Box>
      );
    }

    if (!isReady || !form) return null;

    if (charging) {
      return (
        <Box sx={styles.centeredBox}>
          <Typography sx={{ fontFamily: "OutfitRegular", fontSize: "1rem" }}>
            Loading...
          </Typography>
        </Box>
      );
    }

    if (submitted) {
      return (
        <Box sx={styles.centeredBox}>
          <Image alt="form submitted" src={formSubmittedImage} width={300} />

          <Typography
            sx={{ fontFamily: "OutfitBold", fontSize: "1.5rem", mt: 2 }}
          >
            Form submitted
          </Typography>

          <Typography
            sx={{ fontFamily: "OutfitRegular", fontSize: "1rem", mt: 2 }}
          >
            Your response has been sent successfully.
          </Typography>

          {user ? (
            <Button styles={{ borderRadius: 3, width: 180, height: 40, mt: 3 }}>
              <SpaceDashboardIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
              <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
                Dashboard
              </Typography>
            </Button>
          ) : (
            <Button styles={{ borderRadius: 3, width: 150, height: 40, mt: 3 }}>
              <HomeIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
              <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
                Home
              </Typography>
            </Button>
          )}
        </Box>
      );
    }

    return (
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
    );
  };

  return (
    <>
      <Head>
        <title>{form?.title} | Robustform</title>
        <meta name="description" content={form?.description} />
      </Head>

      <Main>
        <Box sx={styles.container}>{renderContent()}</Box>
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

  centeredBox: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  }),
};
