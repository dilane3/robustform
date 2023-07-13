import Icon from "@components/icons/Icon";
import {
  SxProps,
  Theme,
  Box,
  FormControlLabel,
  Radio as BaseRadio,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { SyntheticEvent } from "react";

type RadioProps = {
  value: string;
  edit?: boolean;
  checked?: boolean;
  onDelete: (value: string) => void;
  onChange: (value: string) => void;
};

export default function Radio({ value, edit, checked, onDelete, onChange }: RadioProps) {

  const handleChange = (event: SyntheticEvent<Element, Event>) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      onChange(value);
    }
  };

  return (
    <Box sx={styles.box}>
      <FormControlLabel
        control={<BaseRadio />}
        label={value}
        checked={checked}
        onChange={handleChange}
      />

      {edit && (
        <Icon onClick={() => onDelete(value)}>
          <CancelIcon color="action" />
        </Icon>
      )}
    </Box>
  );
}

Radio.defaultProps = {
  edit: false,
  onDelete: () => {},
  onChange: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  box: (theme) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "&:not(:first-child)": {
      marginTop: 1,
    },
  }),
};
