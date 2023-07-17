import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { firstLetterToUppercase } from "src/utility";
import { AuthState } from "src/gx/signals/auth";
import { useActions, useSignal } from "@dilane3/gx";
import React from "react";
import { authProvider } from "src/authProvider";
import { styles as headerStyles } from "src/styles/mui-styles/header";
import { Colors } from "src/constants";

export default function HeaderAvatar() {
  // Local state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Global actions
  const { logout } = useActions("auth");

  // Handlers

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handlers

  const handleLogout = async () => {
    const response = await authProvider.logout(false);

    logout();

    handleClose();

    window.location.href = "/";
  };

  // Methods

  const justTwoLetter = (str: string) => {
    if (str) {
      return str.substring(0, 2);
    }

    return "";
  };

  if (!user) return null;

  return (
    <>
      <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
        <Avatar
          sx={headerStyles.avatar}
          style={{
            fontFamily: "OutfitMedium",
            fontSize: "1rem",
            backgroundColor: user.color,
          }}
        >
          {firstLetterToUppercase(justTwoLetter(user.username || user.email))}
        </Avatar>
      </Box>

      <Menu
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
          <PersonOutlineOutlinedIcon sx={styles.menuItemIcon} color="action" />
          <Typography sx={styles.menuItemText}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SettingsOutlinedIcon sx={styles.menuItemIcon} color="action" />
          <Typography sx={styles.menuItemText}>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={styles.menuItemIcon} color="action" />
          <Typography sx={styles.menuItemText}>Log out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  menuItemIcon: {
    fontSize: "1.5rem",
    mr: 2,
  },

  menuItemText: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
  },
};
