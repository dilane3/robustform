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
};

export default function Checkbox({ value, edit }: CheckboxProps) {
  return (
    <Box sx={styles.box}>
      <FormControlLabel control={<BaseCheckbox />} label={value} />

      {edit && (
        <Icon>
          <CancelIcon color="action" />
        </Icon>
      )}
    </Box>
  );
}

Checkbox.defaultProps = {
  edit: false,
};

const styles: Record<string, SxProps<Theme>> = {
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 1,
  },
};
