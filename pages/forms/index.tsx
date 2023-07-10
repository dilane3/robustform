import DashboardLayout from "@components/layout/dashboard/DashboardLayout";
import FormItem from "@components/layout/dashboard/FormItem";
import EmptyForm from "@components/pages/dashboard/Empty";
import FormsContainer from "@components/pages/dashboard/FormsContainer";
import { useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import { FormsState } from "src/gx/signals";

export default function Forms() {
  // Global state
  const { selectedFolder } = useSignal<FormsState>("forms");

  return (
    <DashboardLayout>
      {/* <EmptyForm /> */}

      <FormsContainer
        title={selectedFolder ? selectedFolder.name : "All forms"}
        count={selectedFolder ? selectedFolder.forms.length : 1}
      >
        {selectedFolder?.forms.map((form) => (
          <Box sx={styles.formItem} key={form.id}>
            <FormItem form={form} />
          </Box>
        ))}
      </FormsContainer>
    </DashboardLayout>
  );
}

Forms.noLayout = true;

const styles: Record<string, SxProps<Theme>> = {
  formItem: (theme) => ({
    width: "calc((100% / 4) - 1rem)",
    // mx: "auto",

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
