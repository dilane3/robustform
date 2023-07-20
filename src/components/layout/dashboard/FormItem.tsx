import React from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Colors } from "src/constants";
import Icon from "@components/icons/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AdjustIcon from "@mui/icons-material/Adjust";
import Link from "next/link";
import Form from "src/entities/form/Form";
import { truncate, formatDate } from "src/utility";
import formProvider from "src/api/forms";
import { toast } from "react-toastify";
import { useActions } from "@dilane3/gx";

type FormItemProps = {
  form: Form;
};

export default function FormItem({ form }: FormItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Global actions
  const { deleteForm, restoreForm, deleteFormDefinitely } = useActions("forms");

  // Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    deleteForm({
      folderId: form.folderId,
      formId: form.id,
    });

    handleClose();

    const { error } = await formProvider.delete({ id: form.id });

    if (error) {
      toast.error("Failed to delete form");
    } else {
      toast.success("Form deleted successfully");
    }
  };

  const handleRestore = async () => {
    restoreForm({
      folderId: form.folderId,
      formId: form.id,
    });

    handleClose();

    const { error } = await formProvider.restore({ id: form.id });

    if (error) {
      toast.error("Failed to restore the form");
    } else {
      toast.success("Form has been restored successfully");
    }
  };

  const handleDeleteDefinitely = async () => {
    deleteFormDefinitely({
      folderId: form.folderId,
      formId: form.id,
    });

    handleClose();

    const { error } = await formProvider.deleteDefinitely({ id: form.id });

    if (error) {
      toast.error("Failed to delete the form");
    } else {
      toast.success("Form has been deleted successfully");
    }
  };

  return (
    <Box component="div" sx={styles.formItem}>
      <Box sx={styles.formHeader} />

      <Box sx={styles.formBody}>
        {form.deleted ? (
          <Typography sx={styles.title} title={form.title}>
            {form.title}
          </Typography>
        ) : (
          <Link href={`forms/${form.id}`} style={{ width: "auto" }}>
            <Typography sx={styles.title} title={form.title}>
              {form.title}
            </Typography>
          </Link>
        )}

        <Box sx={styles.formBottom}>
          <Box sx={styles.date}>
            <AccessAlarmIcon sx={{ fontSize: "1rem" }} color="action" />
            <Typography
              sx={{ fontSize: "0.8rem", fontFamily: "OutfitRegular", ml: 1 }}
            >
              {formatDate(form.createdAt)}
            </Typography>
          </Box>

          <Icon onClick={handleClick}>
            <MoreVertIcon sx={{ fontSize: "1rem" }} color="action" />
          </Icon>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {form.deleted ? (
              <>
                <MenuItem onClick={handleRestore}>
                  <AdjustIcon sx={styles.menuItemIcon} color="action" />
                  <Typography sx={styles.menuItemText}>Restore</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDeleteDefinitely}>
                  <DeleteIcon sx={styles.menuItemIcon} color="action" />
                  <Typography sx={styles.menuItemText}>Delete</Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <Link href={`forms/${form.id}`}>
                  <MenuItem onClick={handleClose}>
                    <AdjustIcon sx={styles.menuItemIcon} color="action" />
                    <Typography sx={styles.menuItemText} style={{ color: Colors.black }}>Open</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>
                  <ModeEditIcon sx={styles.menuItemIcon} color="action" />
                  <Typography sx={styles.menuItemText}>Update</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDelete}>
                  <DeleteIcon sx={styles.menuItemIcon} color="action" />
                  <Typography sx={styles.menuItemText}>Delete</Typography>
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  formItem: {
    width: "100%",
    height: "auto",
    border: "1px solid #eee",
    borderRadius: "0.3rem",
  },

  formHeader: {
    width: "100%",
    height: "1rem",
    backgroundColor: Colors.primary,
    borderRadius: "0.3rem 0.3rem 0 0",
  },

  formBody: {
    padding: "0.8rem",
  },

  formBottom: {
    mt: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: "1.5rem",
    fontFamily: "OutfitBold",
    color: Colors.black,

    // truncate text
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  date: {
    display: "flex",
    alignItems: "center",
    color: Colors.black,
  },

  icon: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    padding: "0.5rem",

    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer",
    },
  },

  menuItemIcon: {
    fontSize: "1.5rem",
    mr: 2,
  },

  menuItemText: {
    fontSize: "1rem",
    fontFamily: "OutfitRegular",
  },
};
