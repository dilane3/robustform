import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";
import { Box } from "@mui/material";
import AuthLayout from "@components/layout/AuthLayout";
import { Colors } from "src/constants";

export default function Login() {
  return (
    <AuthLayout>
      <Box
        component="section"
        sx={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: Colors.background,
          display: "flex",
        }}
      >
        <Box
          sx={{
            margin: 0,
            padding: 0,
            width: "50%",
            minHeight: "100%",
            backgroundColor: Colors.secondary,
          }}
          component="section"
        ></Box>

        <Box
          sx={{
            margin: 0,
            padding: 0,
            width: "50%",
            minHeight: "100%",
          }}
          component="section"
        ></Box>
      </Box>
    </AuthLayout>
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
