import { Button as BaseButton, SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outlined" | "contained" | "text";
  onClick: () => void;
  styles: SxProps<Theme>;
};

export default function Button({
  children,
  variant,
  onClick,
  styles,
}: ButtonProps) {
  return (
    <BaseButton
      style={{
        fontSize: "16px",
        fontFamily: "OutfitBold",
      }}
      sx={{
        width: "100%",
        height: "50px",
        borderRadius: "5px",
        outline: "none !important",
        backgroundColor:
          variant === "contained" ? Colors.primary : Colors.background,
        ...styles
      }}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}

Button.defaultProps = {
  variant: "contained",
  onClick: () => {},
  styles: {},
};
