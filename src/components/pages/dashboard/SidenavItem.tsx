import {
  Box,
  Divider,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { truncate } from "src/utility/stringOperations";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

type FolderProps = {
  children?: React.ReactNode;
  text: string;
  className?: string;
  active?: boolean;
  title?: string;
  onClick: () => void;
};

export default function SidenavItem({
  children,
  text,
  className,
  onClick,
  active,
  title,
}: FolderProps) {
  // Local state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handlers

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      onContextMenu={handleContextMenu}
      component="div"
      sx={styles.folder}
      onClick={onClick}
      className={`${active ? "active" : ""}`}
      title={title}
    >
      {children}

      <Typography sx={styles.folderText} className={className} title={text}>
        {truncate(text, 18)}
      </Typography>

      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiMenu-paper": {
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ModeEditIcon sx={styles.menuItemIcon} color="action" />
          <Typography sx={styles.menuItemText}>Update</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <DeleteIcon sx={styles.menuItemIcon} color="action" />
          <Typography sx={styles.menuItemText}>Delete</Typography>
        </MenuItem>
      </Menu> */}
    </Box>
  );
}

SidenavItem.defaultProps = {
  onClick: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  folder: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: "0.5rem",
    transition: "all 0.3s ease-in-out",
    borderRadius: 3,
    mb: 0.5,

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#eee",
    },

    "&.active": {
      backgroundColor: "#ddd",
    },
  },

  folderText: {
    fontSize: "1.1rem",
    fontFamily: "OutfitRegular",
    transition: "all 0.3s ease-in-out",

    "&.active": {
      fontFamily: "OutfitMedium",
    },
  },

  menuItemIcon: {
    fontSize: "1.5rem",
    mr: 2,
  },

  menuItemText: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
  }
};
