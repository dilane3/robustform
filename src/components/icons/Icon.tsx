import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

type IconProps = {
  children: React.ReactNode;
  onClick: (event?: any) => void;
  className: string;
  style: React.CSSProperties;
};

export default function Icon({
  children,
  onClick,
  className,
  style,
}: IconProps) {
  return (
    <Box sx={styles.icon} style={style} className={className} onClick={onClick}>
      {children}
    </Box>
  );
}

Icon.defaultProps = {
  onClick: () => {},
  className: "",
  style: {},
};

const styles: Record<string, SxProps<Theme>> = {
  icon: (theme) => ({
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      backgroundColor: Colors.grayLight,
    },

    "&.not-expanded": {
      transform: "rotate(180deg)",
    },

    [theme.breakpoints.down("md")]: {
      "&.can-rotate": {
        transform: "rotate(180deg)",
        marginLeft: "auto",
      }
    },
  }),
};
