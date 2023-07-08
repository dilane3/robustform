import { Box } from "@mui/material";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
      component="main"
    >
      {children}
    </Box>
  );
}
