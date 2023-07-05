import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function FormItem() {
  return (
    <Box component="div" sx={styles.formItem}>
      <Box sx={styles.formHeader} />

      <Box sx={styles.formBody}>
        <Typography sx={styles.title}>Untitled form</Typography>

        <Box sx={styles.formBottom}>
          <Box sx={styles.date}>
            <AccessAlarmIcon sx={{ fontSize: "1rem" }} color="action" />
            <Typography
              sx={{ fontSize: "0.8rem", fontFamily: "OutfitRegular", ml: 1 }}
            >
              12 Feb 2023
            </Typography>
          </Box>

          <Box sx={styles.icon}>
            <MoreVertIcon sx={{ fontSize: "1rem" }} color="action" />
          </Box>
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
    backgroundColor: "red",
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
    fontSize: "1rem",
    fontFamily: "OutfitBold",
  },

  date: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    padding: "0.5rem",

    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer",
    }
  },
};
