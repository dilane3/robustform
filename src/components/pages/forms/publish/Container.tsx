import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "src/constants";
import Form from "src/entities/form/Form";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "next/link";
import Button from "@components/buttons/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotFoundForm from "../questions/NotFound";
import React from "react";

type ResponseContainerProps = {
  form: Form | null;
  isReady: boolean;
};

export default function PublishContainer({
  form,
  isReady,
}: ResponseContainerProps) {
  // Local state
  const [isCopied, setIsCopied] = React.useState(false);

  // Effects

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }
  }, [isCopied]);

  // Handlers

  const handleCopyLink = () => {
    // Copy into the clipboard
    window.navigator.clipboard.writeText(form?.getFullLink() || "");

    // Set copied
    setIsCopied(true);
  };

  // Render
  const renderContent = () => {
    if (isReady && !form) {
      return <NotFoundForm />;
    }

    if (!isReady || !form) return null;

    return (
      <Box sx={styles.box}>
        <Typography sx={styles.title}>Form Settings</Typography>

        <Typography sx={styles.description}>
          Publish your form and allow people to fill it out.
        </Typography>

        <Divider />

        <Box style={{ padding: "20px 0" }}>
          <Box sx={styles.boxRowBetween}>
            <Box sx={styles.linkBox}>
              <Link
                href={form.getFullLink()}
                target="_blank"
                title={form.getFullLink()}
              >
                <Typography sx={styles.link}>{form.getFullLink()}</Typography>
              </Link>
            </Box>

            <Box
              sx={styles.boxRowStart}
              onClick={handleCopyLink}
              style={{
                backgroundColor: isCopied ? Colors.grayLight : "transparent",
                border: isCopied ? `1px solid ${Colors.green}` : "none",
              }}
            >
              {isCopied ? (
                <>
                  <CheckCircleIcon sx={{ color: Colors.green }} />
                  <Typography
                    sx={styles.iconText}
                    style={{ color: Colors.green }}
                  >
                    Copied
                  </Typography>
                </>
              ) : (
                <>
                  <ContentCopyIcon color="action" />
                  <Typography sx={styles.iconText}>Copy</Typography>
                </>
              )}
            </Box>
          </Box>

          <Box sx={styles.boxRowBetween}>
            <Button
              styles={{ borderRadius: 1, mt: 6, width: "auto", height: 40 }}
            >
              <RestartAltIcon sx={{ color: "#fff", mr: 2 }} />
              <Typography
                sx={{ fontSize: "0.8rem", fontFamily: "OutfitMedium" }}
              >
                Generate new link
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return <Box sx={styles.container}>{renderContent()}</Box>;
}

const styles: Record<string, SxProps<Theme>> = {
  container: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 5rem",
    alignItems: "center",
    background: Colors.sidenav,

    [theme.breakpoints.down("md")]: {
      padding: "2rem 3rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem",
    },
  }),

  box: (theme) => ({
    maxWidth: 600,
    width: "100%",
    height: "auto",
    minHeight: 200,
    background: Colors.background,
    border: `1px solid ${Colors.grayLight}`,
    borderRadius: 2,
    padding: "1rem 2rem",
  }),

  boxRowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  boxRowStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "auto",
    borderRadius: 2,
    border: `1px solid ${Colors.grayLight}`,
    padding: "5px 10px",
    cursor: "pointer",
  },

  boxCol: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    py: 2,
  },

  title: (theme) => ({
    fontSize: "2rem",
    fontFamily: "OutfitBold",
  }),

  description: (theme) => ({
    fontSize: "1.3rem",
    fontFamily: "OutfitRegular",
    my: 1,
    color: Colors.black,
  }),

  linkBox: (theme) => ({
    width: "calc(100% - 120px)",
    cursor: "pointer",
  }),

  link: (theme) => ({
    fontSize: "1.2rem",
    fontFamily: "OutfitRegular",
    color: Colors.primary,
    // cursor: "pointer",

    // truncate text
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  iconText: (theme) => ({
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
    marginLeft: "10px",
  }),
};
