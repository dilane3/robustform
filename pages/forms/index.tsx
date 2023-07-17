import DashboardLayout from "@components/layout/dashboard/DashboardLayout";
import FormItem from "@components/layout/dashboard/FormItem";
import EmptyForm from "@components/pages/dashboard/Empty";
import FormsContainer from "@components/pages/dashboard/FormsContainer";
import { useSignal } from "@dilane3/gx";
import { Box, SxProps, Theme } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { authProvider } from "src/authProvider";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";
import useAuth from "src/hooks/useAuth";

export default function Forms() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  // Get current user
  useAuth();

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

  console.log({ selectedFolder })

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

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

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
