import { Button as BaseButton, SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outlined" | "contained" | "text";
  onClick: () => void;
  styles: SxProps<Theme> | ((theme: Theme) => SxProps<Theme>);
  disabled?: boolean;
};

export default function Button({
  children,
  variant,
  onClick,
  styles,
  disabled,
}: ButtonProps) {

  const getStyles = () => {
    if (styles) {
      if (styles instanceof Function) {
        return styles;
      }

      return styles;
    }
  }
  
  return (
    <BaseButton
      style={{
        fontSize: "16px",
        fontFamily: "OutfitBold",
      }}
      sx={{
        width: "100%",
        height: "50px",
        borderRadius: "10px",
        outline: "none !important",
        backgroundColor:
          variant === "contained" ? Colors.primary : Colors.background,
          ...getStyles()
      }}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      
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
