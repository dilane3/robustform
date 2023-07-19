import {
  Box,
  Typography,
  Avatar,
  SxProps,
  Theme,
  TextField as TextInput,
} from "@mui/material";
import Head from "next/head";
import Main from "../Main";
import { styles as headerStyles } from "src/styles/mui-styles/header";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { Colors } from "src/constants";
import Icon from "@components/icons/Icon";
import Link from "next/link";
import { AuthState } from "src/gx/signals/auth";
import { useSignal } from "@dilane3/gx";
import HeaderAvatar from "../dashboard/HeaderAvatar";
import { FormsState } from "src/gx/signals";
import useResponses from "src/hooks/useResponses";

export type FormLayoutProps = {
  children: React.ReactNode;
  title: string;
  formId?: number;
  formKey: string;
};

export default function FormLayout({
  children,
  title,
  formId,
  formKey
}: FormLayoutProps) {
  // Global state
  const { user } = useSignal<AuthState>("auth");
  const { updateLoading, updateStatus } = useSignal<FormsState>("forms");

  // Fetch responses
  useResponses(6);

  return (
    <>
      <Head>
        <title>{title} | Robustform</title>
        <meta name="description" content="form editor" />
      </Head>

      <Main>
        <Box
          component="header"
          sx={headerStyles.header}
          style={{ border: "none" }}
        >
          <Box sx={styles.headerTitle}>
            <Typography sx={headerStyles.logo}>robustform</Typography>
            <Typography
              sx={styles.formSaved}
              style={{
                color: updateLoading ? Colors.gray : updateStatus ? "green" : "red",
              }}
            >
              {updateLoading ? "Saving..." : "form saved"}
            </Typography>
          </Box>

          <Box sx={styles.headerRight}>
            <Box sx={styles.icons}>
              <Icon style={{ marginRight: 20 }}>
                <ColorLensOutlinedIcon color="action" />
              </Icon>

              <Link href={`/forms/view/${formId}?key=${formKey}`} target="_blanc">
                <Icon>
                  <VisibilityOutlinedIcon color="action" />
                </Icon>
              </Link>
            </Box>

            <HeaderAvatar />
          </Box>
        </Box>

        <Box component="section" sx={styles.bodyContainer}>
          {children}
        </Box>
      </Main>
    </>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  bodyContainer: (theme) => ({
    width: "100%",
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }),

  headerTitle: {
    display: "flex",
    alignItems: "baseline",
  },

  formSaved: {
    marginLeft: "20px",
    fontFamily: "OutfitRegular",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
  },

  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "50px",
  },

  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    marginRight: "10px",

    "&:hover": {
      backgroundColor: Colors.grayLight,
    },
  },
};
