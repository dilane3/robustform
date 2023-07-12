import Icon from "@components/icons/Icon";
import { SxProps, Theme, Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type ChoiceItemProps = {
  value: string;
  edit?: boolean;
  onDelete: (value: string) => void;
};

export default function ChoiceItem({ value, edit, onDelete }: ChoiceItemProps) {
  return (
    <Box sx={styles.box}>
      <Typography sx={{ fontSize: "1rem", fontFamily: "OutfitRegular" }}>
        {value}
      </Typography>

      {edit && (
        <Icon onClick={() => onDelete(value)}>
          <CancelIcon color="action" />
        </Icon>
      )}
    </Box>
  );
}

ChoiceItem.defaultProps = {
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
