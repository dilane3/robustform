import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import notFoundImage from "src/assets/images/notfound.png";
import { Colors } from "src/constants";

export default function NotFoundForm() {
  return (
    <Box sx={styles.centeredBox}>
      <Image alt="form submitted" src={notFoundImage} width={250} />

      <Typography sx={{ fontFamily: "OutfitBold", fontSize: "1.5rem", mt: 2 }}>
        Form not found
      </Typography>

      <Typography sx={{ fontFamily: "OutfitRegular", fontSize: "1rem", mt: 2 }}>
        The form you are looking for does not exist or haven't been loaded yet.
      </Typography>

      <Link href="/forms">
        <Button styles={{ borderRadius: 3, width: 280, height: 40, mt: 3 }}>
          <SpaceDashboardIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
          <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
            Come back to dashboard
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}

export const styles: Record<string, SxProps<Theme>> = {
  centeredBox: (theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  }),
};
