import Icon from "@components/icons/Icon";
import {
  SxProps,
  Theme,
  Box,
  FormControlLabel,
  Radio as BaseRadio,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type RadioProps = {
  value: string;
  edit?: boolean;
  onDelete: (value: string) => void;
};

export default function Radio({ value, edit, onDelete }: RadioProps) {
  return (
    <Box sx={styles.box}>
      <FormControlLabel control={<BaseRadio />} label={value} />

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
