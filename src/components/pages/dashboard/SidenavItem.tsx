import { Box, SxProps, Theme, Typography } from "@mui/material";

type FolderProps = {
  children?: React.ReactNode;
  text: string;
  className?: string;
  active?: boolean;
  onClick: () => void;
};

export default function SidenavItem({
  children,
  text,
  className,
  onClick,
  active,
}: FolderProps) {
  return (
    <Box
      component="div"
      sx={styles.folder}
      onClick={onClick}
      className={`${active ? "active" : ""}`}
    >
      {children}

      <Typography
        sx={styles.folderText}
        className={className}
      >
        {text}
      </Typography>
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
    }
  },

  folderText: {
    fontSize: "1.1rem",
    fontFamily: "OutfitRegular",
    transition: "all 0.3s ease-in-out",

    "&.active": {
      fontFamily: "OutfitBold",
    }
  }
};
