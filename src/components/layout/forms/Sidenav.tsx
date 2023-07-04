import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Colors } from "src/constants";
import SidenavItem from "@components/pages/forms/SidenavItem";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

export default function Sidenav() {
  return (
    <Box component="section" sx={styles.container}>
      <Button styles={{ borderRadius: 2, width: "100%", height: 40 }}>
        <AddCircleIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
        <Typography sx={{ fontSize: "1rem", fontFamily: "OutfitBold" }}>
          Create new form
        </Typography>
      </Button>

      <Box sx={styles.box}>
        <Typography sx={styles.title}>My forms</Typography>

        <Box sx={styles.folders}>
          <SidenavItem text="Form 1">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 2">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 2">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 2">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 2">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 2">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
          <SidenavItem text="Form 3">
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>

          <SidenavItem text="Add new folder">
            <AddCircleIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
        </Box>
      </Box>

      <Box sx={styles.box}>
        <Typography sx={styles.title}>Plus</Typography>

        <Box sx={styles.folders}>
          <SidenavItem text="Corbeille">
            <DeleteIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
          </SidenavItem>
        </Box>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    padding: "1rem",
    width: "100%",
    height: "100%",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    mt: 3,
  },

  boxRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0.5rem",
  },

  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitMedium",
    color: Colors.black,
  },

  folders: {
    mt: 3,
  },
};
