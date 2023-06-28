import { Box } from "@mui/material";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <Box
      sx={{ margin: 0, padding: 0, width: "100vw", minHeight: "100vh" }}
      component="main"
    >
      {children}
    </Box>
  );
}
