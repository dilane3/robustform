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
import { FOLDER_BIN_ID } from "src/gx/signals/forms/constants";
import useAuth from "src/hooks/useAuth";

export default function Forms() {
  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  // Get current user
  useAuth();

  // Memoized values
  const [allForms, deletedForms] = useMemo(() => {
    const myForms: Form[] = [];
    const deletedForms: Form[] = [];

    forms.forEach((folder) => {
      folder.forms.forEach((form) => {
        if (form.deleted) {
          deletedForms.push(form);
        } else {
          myForms.push(form);
        }
      });
    });

    return [myForms, deletedForms];
  }, [JSON.stringify(forms)]);

  const renderContent = () => {
    if (selectedFolder) {
      if (selectedFolder.id === FOLDER_BIN_ID) {
        return deletedForms.map((form) => (
          <Box sx={styles.formItem} key={form.id}>
            <FormItem form={form} />
          </Box>
        ));
      } else {
        return selectedFolder.forms.map((form) => {
          if (form.deleted) return null;

          return (
            <Box sx={styles.formItem} key={form.id}>
              <FormItem form={form} />
            </Box>
          );
        });
      }
    }

    return allForms.map((form) => (
      <Box sx={styles.formItem} key={form.id}>
        <FormItem form={form} />
      </Box>
    ));
  };

  return (
    <DashboardLayout>
      {allForms.length === 0 && deletedForms.length === 0 ? (
        <EmptyForm />
      ) : (
        <FormsContainer
          title={selectedFolder ? selectedFolder.name : "All forms"}
          count={selectedFolder ? selectedFolder.forms.length : allForms.length}
        >
          {renderContent()}
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
