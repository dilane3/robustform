import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import AuthLayout from "@components/layout/AuthLayout";
import { Colors } from "src/constants";
import Input from "@components/inputs/Input";
import Button from "@components/buttons/Button";
import Image from "next/image";
import loginImage from "src/assets/images/login.png";
import googleImage from "src/assets/images/google.png";
import Link from "next/link";


export default function Login() {
  return (
    <AuthLayout>
      <Box component="section" sx={styles.container}>
        <Box sx={styles.authSection} component="section">
          <Typography sx={styles.title}>Login into your account</Typography>

          <Box sx={styles.box}>
            <Box sx={styles.googleLogin}>
              <Box sx={styles.googleIcon}>
                <Image
                  src={googleImage}
                  alt="Google login"
                  width={30}
                  height={30}
                />
              </Box>

              <Typography
                sx={{ fontSize: 16, fontFamily: "OutfitMedium", ml: 4 }}
              >
                Signin with google
              </Typography>
            </Box>

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
                  backgroundColor: Colors.secondary,
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

            <Button>
              <Typography>Login</Typography>
            </Button>
          </Box>

          <Box sx={styles.boxRow}>
            <Typography component="span" sx={styles.accountQuestion}>
              Don't have an account yet ?{" "}

              <Link href="/register">
                <Typography component="span" sx={styles.action}>
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.infoSection} component="section">
          <Typography sx={styles.logo}>Robustform</Typography>

          <Box
            sx={{ ...styles.box, ...styles.imageContainer } as SxProps<Theme>}
          >
            <Image
              src={loginImage}
              alt="Login"
              width={500}
              style={styles.image as React.CSSProperties}
            />
          </Box>

          <Box sx={styles.box}>
            <Typography
              sx={{
                fontFamily: "OutfitMedium",
                fontSize: 22,
                textAlign: "center",
              }}
            >
              Robustform is a form builder that allows you to create forms
              easily and quickly.
            </Typography>
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

// key values type

const styles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  container: (theme) => ({
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: Colors.background,
    display: "flex",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      overflowY: "auto",
      height: "auto",
    },
  }),

  authSection: (theme) => ({
    margin: 0,
    padding: "2rem 5rem",
    width: "50%",
    minHeight: "100%",
    backgroundColor: Colors.secondary,
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflowY: "hidden",
      height: "auto",
    },
  }),

  infoSection: (theme) => ({
    margin: 0,
    padding: "2rem 5rem",
    width: "50%",
    minHeight: "100%",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflowY: "hidden",
      height: "auto",
    },
  }),

  title: (theme) => ({
    fontFamily: "OutfitBold",
    fontSize: "2.5rem",
    color: Colors.background,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  }),

  logo: {
    fontFamily: "OutfitBold",
    fontSize: "2rem",
    color: Colors.primary,
  },

  box: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },

  boxRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },

  googleLogin: {
    position: "relative",
    width: "100%",
    height: 50,
    borderRadius: 2,
    backgroundColor: Colors.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: "OutfitMedium",
  },

  googleIcon: {
    ml: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  accountQuestion: {
    fontFamily: "OutfitMedium",
    fontSize: 16,
    color: Colors.background,
  },

  action: {
    fontFamily: "OutfitBold",
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 2,
  },

  image: {
    width: "100%",
    height: "auto",
  },

  imageContainer: (theme) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
};
