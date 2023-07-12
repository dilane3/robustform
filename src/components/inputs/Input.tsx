import React from "react";
import {
  InputAdornment,
  SxProps,
  TextField as TextInput,
  Theme,
} from "@mui/material";

type InputProps = {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
  variant?: "outlined" | "filled" | "standard";
  type: string;
  value: string;
  helperText?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles: SxProps<Theme>;
  size: "small" | "medium";
  icon?: React.ReactNode;
  width: string | number;
  autoFocus?: boolean;
};

export default function Input({
  ref,
  label,
  variant,
  type,
  value,
  onChange,
  styles,
  helperText,
  error,
  size,
  icon,
  width,
  autoFocus
}: InputProps) {
  return (
    <TextInput
      ref={ref}
      label={label}
      type={type}
      variant={variant}
      value={value}
      onChange={onChange}
      sx={styles}
      style={inputStyles}
      helperText={helperText}
      error={error}
      size={size}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : undefined,
        style: {
          fontFamily: "OutfitRegular",
          width
        },
      }}
      autoFocus={autoFocus}
    />
  );
}

const inputStyles = {
  width: "100%",
  borderRadius: "10px",
  outline: "none !important",
  fontSize: "16px",
  fontFamily: "OutfitRegular",
};

Input.defaultProps = {
  type: "text",
  variant: "outlined",
  value: "",
  onChange: () => {},
  styles: {},
  size: "normal",
  width: "100%"
};
