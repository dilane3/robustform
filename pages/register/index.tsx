import React from "react";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import AuthLayout from "@components/layout/AuthLayout";
import { Colors } from "src/constants";
import Input from "@components/inputs/Input";
import Button from "@components/buttons/Button";
import Image from "next/image";
import loginImage from "src/assets/images/signup.png";
import googleImage from "src/assets/images/google.png";
import Link from "next/link";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { HttpError } from "@refinedev/core";

const schema = object({
  email: string().email().required(),
  password: string().min(6).max(20).required(),
});

export default function Register() {
  const { register } = authProvider;

  // Local state
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [verified, setVerified] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // Effects

  React.useEffect(() => {
    const validateForm = async () => {
      await validate();
    };

    validateForm();
  }, [email, password]);

  // Handlers

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!verified || loading) return;

    setLoading(true);

    if (register) {
      const { redirectTo, success, error } = await register({
        email,
        password,
      });

      if (success) {
        toast.success(`You're almost there, please check your email`);

        window.location.href = redirectTo as string;
      } else {
        console.log({ error });

        if ((error as HttpError)?.status === 400) {
          toast.error("Email or password is incorrect.");
        } else {
          toast.error("Something went wrong, please try again later.");
        }
      }
    }

    setLoading(false);
  };

  // Methods

  const validate = async () => {
    try {
      await schema.validate({
        email,
        password,
      });

      setVerified(true);
    } catch (error) {
      console.log(error);

      setVerified(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="section" sx={styles.container}>
        <Box sx={styles.authSection} component="section">
          <Typography sx={styles.title}>Create an account</Typography>

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
                Signup with google
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
              value={email}
              onChange={(event) => handleChange(event, "email")}
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
              value={password}
              onChange={(event) => handleChange(event, "password")}
            />

            <Button disabled={!verified || loading} onClick={handleSubmit}>
              <Typography sx={{ fontSize: "1rem", fontFamily: "OutfitMedium" }}>
                Sign up
              </Typography>
            </Button>
          </Box>

          <Box sx={styles.boxRow}>
            <Typography component="span" sx={styles.accountQuestion}>
              Already have an account ?{" "}
              <Link href="/login">
                <Typography component="span" sx={styles.action}>
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.infoSection} component="section">
          <Link href="/">
            <Typography sx={styles.logo}>Robustform</Typography>
          </Link>

          <Box sx={styles.imageContainer}>
            <Image src={loginImage} alt="Login" width={500} />
          </Box>

          <Box sx={styles.box}>
            <Typography
              sx={{
                fontFamily: "OutfitMedium",
                fontSize: 22,
                textAlign: "center",
              }}
            >
              Join us and start generating your forms quickly, in an easy way.
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/forms`,
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
    width: "500px",
    minHeight: "100%",
    backgroundColor: Colors.secondary,
    overflowY: "auto",
    [theme.breakpoints.down(1000)]: {
      width: "50%",
    },
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
    width: "calc(100% - 500px)",
    minHeight: "100%",
    overflowY: "auto",
    [theme.breakpoints.down(1000)]: {
      width: "50%",
    },
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
    width: "90%",
    height: "auto",
    margin: "0 auto",
  },

  imageContainer: (theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "100%",
        height: "auto",
      },
    },
  }),
};
