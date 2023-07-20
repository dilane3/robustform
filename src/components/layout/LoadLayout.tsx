import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";
import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/images/logo.png";
import Image from "next/image";

type LoadLayoutProps = {
  children: React.ReactNode;
};

export default function LoadLayout({ children }: LoadLayoutProps) {
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
              }
            }
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
