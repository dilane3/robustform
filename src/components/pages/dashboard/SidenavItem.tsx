import { Box, SxProps, Theme, Typography } from "@mui/material";

type FolderProps = {
  children?: React.ReactNode;
  text: string;
  className?: string;
};

export default function SidenavItem({
  children,
  text,
  className,
}: FolderProps) {
  return (
    <Box component="div" sx={styles.folder}>
      {children}

      <Typography
        sx={{
          fontSize: "1.1rem",
          fontFamily: "OutfitRegular",
        }}
        className={className}
      >
        {text}
      </Typography>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  folder: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: "0.5rem",
    transition: "all 0.2s ease-in-out",
    borderRadius: 3,
    mb: 0.5,

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#eee",
    },
  },
};
