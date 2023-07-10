import Button from "@components/buttons/Button";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Colors } from "src/constants";
import SidenavItem from "@components/pages/dashboard/SidenavItem";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { useActions, useSignal } from "@dilane3/gx";
import { FormsState, ModalType } from "src/gx/signals";
import { FOLDER_BIN } from "src/gx/signals/forms/constants";
import { useMemo } from "react";

export default function Sidenav() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  const { open } = useActions("modal");
  const { selectFolder } = useActions("forms");

  // Memoized values
  const folderBin = useMemo(() => {
    return forms.find((folder) => folder.name === FOLDER_BIN);
  }, [forms]);

  // Handlers
  const handleOpenCreateFolder = () => {
    open(ModalType.CREATE_FOLDER);
  };

  const handleOpenCreateForm = () => {
    open(ModalType.CREATE_FORM);
  };

  // Methods
  const renderFolders = () => {
    return forms.map((folder) => {
      if (folder.name === FOLDER_BIN) {
        return null;
      }

      return (
        <SidenavItem
          key={folder.id}
          text={folder.name}
          onClick={() => selectFolder(folder)}
          active={selectedFolder?.id === folder.id}
          className={`${
            selectedFolder && selectedFolder.id === folder.id && "active"
          }`}
        >
          <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="action" />
        </SidenavItem>
      );
    });
  };

  return (
    <Box component="section" sx={styles.container}>
      <Button
        styles={{ borderRadius: 3, width: "100%", height: 40 }}
        onClick={handleOpenCreateForm}
      >
        <AddCircleIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
        <Typography sx={{ fontSize: "0.9rem", fontFamily: "OutfitBold" }}>
          Create new form
        </Typography>
      </Button>

      <Box sx={styles.box}>
        <Typography sx={styles.title}>My forms</Typography>

        <Box sx={styles.folders}>
          <SidenavItem
            text="All forms"
            onClick={() => selectFolder(null)}
            active={!selectedFolder}
            className={`${!selectedFolder && "active"}`}
          >
            <FolderIcon sx={{ fontSize: "1.5rem", mr: 2 }} color="warning" />
          </SidenavItem>

          {renderFolders()}

          <Button
            variant="text"
            styles={{
              borderRadius: 3,
              width: "100%",
              height: 40,
              justifyContent: "flex-start",
              backgroundColor: "transparent",
            }}
            onClick={handleOpenCreateFolder}
          >
            <AddCircleIcon
              sx={{ fontSize: "1.5rem", mr: 2, color: Colors.primary }}
            />
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontFamily: "OutfitBold",
                color: Colors.primary,
              }}
            >
              Add new folder
            </Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={styles.box}>
        <Typography sx={styles.title}>Plus</Typography>

        <Box sx={styles.folders}>
          <SidenavItem 
            text={FOLDER_BIN}
            onClick={() => selectFolder(folderBin)}
            active={selectedFolder?.id === folderBin?.id}
            className={`${
              selectedFolder && selectedFolder.id === folderBin?.id && "active"
            }`}
          >
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
    fontSize: "1.3rem",
    fontFamily: "OutfitMedium",
    color: Colors.black,
  },

  folders: {
    mt: 2,
  },
};
