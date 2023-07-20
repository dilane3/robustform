import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NotFoundForm from "../questions/NotFound";
import Form from "src/entities/form/Form";
import { useMemo } from "react";
import { CardType } from "src/entities/card/type";
import { formatDate } from "src/utility";

type ResponseContainerProps = {
  form: Form | null;
  isReady: boolean;
};

export default function ResponseContainer({
  form,
  isReady,
}: ResponseContainerProps) {
  // Memoized values
  const [columns, rows] = useMemo(() => {
    if (!form) return [[], []];

    // Construct columns
    const columns: GridColDef[] = [];

    const questions = form.cards;

    for (const card of questions) {
      if (card.type === CardType.QUESTION) {
        columns.push({
          field: card.id.toString(),
          headerName: card.question.label,
          width: 150,
        });
      }
    }

    // Construct rows
    const rows = [];

    const responses = form.responses;

    for (const response of responses) {
      let row = {} as any;

      row["id"] = response.id;

      for (const responseItem of response.responseItems) {
        row[responseItem.questionId] = responseItem.values.join(" | ");
      }

      rows.push(row);
    }

    return [columns, rows];
  }, [form]);

  // Render
  const renderContent = () => {
    if (isReady && !form) {
      return <NotFoundForm />;
    }

    if (!isReady || !form) return null;

    return (
      <>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>{form.title}</Typography>

          <Box sx={styles.dateContainer}>
            <AccessAlarmsIcon sx={{ fontSize: "1.3rem" }} color="action" />
            <Typography sx={styles.dateText}>
              {formatDate(form.createdAt)}
            </Typography>
          </Box>

          {form.description && (
            <Typography sx={styles.description}>{form.description}</Typography>
          )}
        </Box>

        <Box sx={styles.content}>
          <Typography sx={styles.contentTitle}>Questions & Answers</Typography>

          <Box sx={styles.responseTableContainer}>
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </Box>
      </>
    );
  };

  return <Box sx={styles.container}>{renderContent()}</Box>;
}

export const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 5rem",
    background: Colors.background,
    overflowY: "auto",

    [theme.breakpoints.down("md")]: {
      padding: "2rem 3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
    },
  }),

  header: (theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }),

  title: (theme) => ({
    fontSize: "3rem",
    fontFamily: "OutfitBold",
    color: Colors.black,
    lineHeight: 1.2,
    mb: 0.8,

    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem"
    }
  }),

  dateContainer: {
    display: "flex",
    alignItems: "center",
  },

  dateText: {
    fontSize: "1rem",
    fontFamily: "OutfitLight",
    ml: 1,
  },

  description: {
    fontSize: "1.2rem",
    fontFamily: "OutfitRegular",
    color: Colors.black,
    mt: 2,
    maxWidth: 600,
  },

  content: {
    width: "100%",
    height: 200,
  },

  contentTitle: (theme) => ({
    fontSize: "2rem",
    fontFamily: "OutfitMedium",
    margin: "1rem 0rem",
    color: Colors.primary,

    [theme.breakpoints.down("md")]: {
      margin: "1rem 0rem",
    },

    [theme.breakpoints.down("sm")]: {
      margin: "1rem 0rem",
    },
  }),

  responseTableContainer: {
    width: "auto",
    maxWidth: "100%",
  },
};
