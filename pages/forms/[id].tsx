import FormLayout from "@components/layout/forms/FormLayout";
import Tab from "@components/tabs/Tab";
import { useActions, useSignal } from "@dilane3/gx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { authProvider } from "src/authProvider";
import Form from "src/entities/form/Form";
import { FormsState } from "src/gx/signals";

export default function SpecificForm() {
  // URL handler
  const { query, isReady } = useRouter();
  const { id } = query as { id: string };

  // Global state
  const { forms, selectedFolder } = useSignal<FormsState>("forms");

  // Memoized values
  const form = React.useMemo(() => {
    if (!id) return null;

    let form: Form | null = null;

    for (let folder of forms) {
      for (let f of folder.forms) {
        if (f.id === +id) {
          form = f;
        }
      }
    }

    return form;
  }, [JSON.stringify(forms)]) as Form | null;

  return (
    <FormLayout title={form ? form.title : ""} formId={form?.id}>
      <Tab />
    </FormLayout>
  );
}

SpecificForm.noLayout = true;

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
