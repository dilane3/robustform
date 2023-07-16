import { Box, Typography } from "@mui/material";
import React from "react";
import { Colors } from "src/constants";

type LoadLayoutProps = {
  children: React.ReactNode;
};

export default function LoadLayout({ children }: LoadLayoutProps) {
  // Local state
  const [loaded, setLoaded] = React.useState(false);

  // Effects

  React.useEffect(() => {
    // wait when the page is loaded

    // another method
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <Box>{children}</Box>

      {!loaded && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: Colors.background,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      )}
    </>
  );
}
