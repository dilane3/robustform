import DashboardLayout from "@components/layout/dashboard/DashboardLayout";
import FormItem from "@components/layout/dashboard/FormItem";
import EmptyForm from "@components/pages/dashboard/Empty";
import FormsContainer from "@components/pages/dashboard/FormsContainer";
import { useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";

export default function Forms() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  // Memoized values
  const allForms = useMemo(() => {
    const myForms: Form[] = [];

    forms.forEach((folder) => {
      folder.forms.forEach((form) => {
        myForms.push(form);
      });
    });

    return myForms;
  }, [JSON.stringify(forms)]);

  return (
    <DashboardLayout>
      {allForms.length === 0 ? (
        <EmptyForm />
      ) : (
        <FormsContainer
          title={selectedFolder ? selectedFolder.name : "All forms"}
          count={selectedFolder ? selectedFolder.forms.length : allForms.length}
        >
          {selectedFolder
            ? selectedFolder.forms.map((form) => (
                <Box sx={styles.formItem} key={form.id}>
                  <FormItem form={form} />
                </Box>
              ))
            : allForms.map((form) => (
                <Box sx={styles.formItem} key={form.id}>
                  <FormItem form={form} />
                </Box>
              ))}
        </FormsContainer>
      )}
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
