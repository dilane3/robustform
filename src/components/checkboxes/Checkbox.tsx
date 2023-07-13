import Icon from "@components/icons/Icon";
import {
  SxProps,
  Theme,
  Box,
  FormControlLabel,
  Checkbox as BaseCheckbox,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type CheckboxProps = {
  value: string;
  edit?: boolean;
  checked?: boolean;
  onDelete: (value: string) => void;
  onChange?: (value: string) => void;
};

export default function Checkbox({
  value,
  edit,
  checked,
  onDelete,
  onChange,
}: CheckboxProps) {
  return (
    <Box sx={styles.box}>
      <FormControlLabel
        control={<BaseCheckbox />}
        label={value}
        checked={checked}
        onChange={() => onChange && onChange(value)}
      />

      {edit && (
        <Icon onClick={() => onDelete(value)}>
          <CancelIcon color="action" />
        </Icon>
      )}
    </Box>
  );
}

Checkbox.defaultProps = {
  edit: false,
  onDelete: () => {},
  onchange: () => {},
};

const styles: Record<string, SxProps<Theme>> = {
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "&:not(:first-child)": {
      marginTop: 1,
    },
  },
};
