import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";
import { Box, Typography } from "@mui/material";
import AuthLayout from "@components/layout/AuthLayout";
import { Colors } from "src/constants";
import Input from "@components/inputs/Input";

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
          overflowY: "hidden"
        }}
      >
        <Box sx={styles.authSection} component="section">
          <Typography sx={styles.title}>Login into your account</Typography>

          <Box sx={styles.box}>
            <Box sx={styles.googleLogin}></Box>

            <Box sx={{ mt: 5, position: "relative" }}>
              <hr />

              <Typography
                sx={{
                  fontFamily: "OutfitMedium",
                  color: Colors.background,
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: -5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 30,
                  backgroundColor: Colors.secondary
                }}
              >
                or
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.box}>
            <Input
              label="Email"
              variant="filled"
              styles={{
                borderRadius: 2,
                backgroundColor: Colors.background,
                marginBottom: 3,
              }}
              size="small"
            />
            <Input
              label="Password"
              type="password"
              variant="filled"
              styles={{
                borderRadius: 2,
                marginBottom: 3,
                backgroundColor: Colors.background,
              }}
              size="small"
            />
          </Box>
        </Box>

        <Box
          sx={{
            margin: 0,
            padding: 0,
            width: "50%",
            minHeight: "100%",
          }}
          component="section"
        >
          <Box>
            <Input
              label="Username"
              helperText="At least 5 characters"
              error
              styles={{ width: 200 }}
            />
          </Box>
        </Box>
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

const styles = {
  authSection: {
    margin: 0,
    padding: "2rem 5rem",
    width: "50%",
    minHeight: "100%",
    backgroundColor: Colors.secondary,
    overflowY: "auto",
  },

  title: {
    fontFamily: "OutfitBold",
    fontSize: "2.5rem",
    color: Colors.background,
  },

  box: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },

  googleLogin: {
    width: "100%",
    height: 50,
    borderRadius: 2,
    backgroundColor: Colors.background,
    display: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: "OutfitMedium",
  },
};
