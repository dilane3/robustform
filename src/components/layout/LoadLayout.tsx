import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/images/logo.png";
import Image from "next/image";
import { supabaseClient } from "src/utility";
import { useRouter } from "next/router";
import nookies from "nookies";

type LoadLayoutProps = {
  children: React.ReactNode;
};

export default function LoadLayout({ children }: LoadLayoutProps) {
  const router = useRouter();

  // Local state
  const [loaded, setLoaded] = React.useState(false);

  // Get the data of the current user
  useAuth();

  // Effects

  React.useEffect(() => {
    // wait when the page is loaded

    window.addEventListener("load", () => {
      console.log("loaded");
    });

    // another method
    setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("load", () => {
        console.log("loaded");
      });
    };
  }, []);

  React.useEffect(() => {
    const handleOAuth = () => {
      supabaseClient.auth.onAuthStateChange((event, session) => {
        // Check if the user is logged in and a session is available
        if (event === "SIGNED_IN" && session?.access_token) {
          const accessToken = session.access_token;

          // Store the access token in a cookie
          nookies.set(null, "token", accessToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
            sameSite: "none",
            secure: true,
          });

          // Redirect the user to the desired page after successful login
          router.push("/forms");
        }
      });
    };

    handleOAuth();
  }, []);

  return (
    <>
      <Box>{children}</Box>

      {!loaded && (
        <Box
          sx={(theme) => ({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: Colors.background,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            "& > *": {
              // Make opacity animation
              opacity: 0.6,
              animation: "fadeIn 1s ease-in-out infinite alternate",

              // keyframes
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0.6,
                },

                "100%": {
                  opacity: 1,
                },
              },
            },

            "& > img": {
              [theme.breakpoints.down("sm")]: {
                width: 130,
                height: 130,
              },
            },
          })}
        >
          <Image src={Logo} alt="Logo" width={200} height={200} />

          <Typography sx={{ fontSize: "1.2rem", fontFamily: "OutfitMedium" }}>
            Loading...
          </Typography>
        </Box>
      )}
    </>
  );
}
