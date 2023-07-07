import DashboardLayout from "@components/layout/forms/DashboardLayout";
import FormItem from "@components/layout/forms/FormItem";
import EmptyForm from "@components/pages/forms/Empty";
import FormsContainer from "@components/pages/forms/FormsContainer";
import { Box, SxProps, Theme } from "@mui/material";

export default function Forms() {
  return (
    <DashboardLayout>
      {/* <EmptyForm /> */}

      <FormsContainer title="All forms" count={10}>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
        <Box sx={styles.formItem}>
          <FormItem />
        </Box>
      </FormsContainer>
    </DashboardLayout>
  );
}

Forms.noLayout = true;

const styles: Record<string, SxProps<Theme>> = {
  formItem: (theme) => ({
    width: "calc((100% / 4) - 1rem)",
    mx: "auto",

    [theme.breakpoints.down(1000)]: {
      width: "calc((100% / 3) - 1rem)",
    },

    [theme.breakpoints.down(850)]: {
      width: "calc((100% / 2) - 1rem)",
    },

    [theme.breakpoints.down(650)]: {
      width: "100%",
    },
  }),
};
