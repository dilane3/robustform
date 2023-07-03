import React from "react";
import { SxProps, TextField as TextInput, Theme } from "@mui/material";

type InputProps = {
  label: string;
  variant?: "outlined" | "filled" | "standard";
  type: string;
  value: string;
  helperText?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles: SxProps<Theme>;
  size: "small" | "medium";
};

export default function Input({
  label,
  variant,
  type,
  value,
  onChange,
  styles,
  helperText,
  error,
  size,
}: InputProps) {
  return (
    <TextInput
      label={label}
      type={type}
      variant={variant}
      value={value}
      onChange={onChange}
      sx={{ ...styles, inputStyles }}
      helperText={helperText}
      error={error}
      size={size}
    />
  );
}

const inputStyles: React.CSSProperties = {
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
};