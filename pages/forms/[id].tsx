import FormLayout from "@components/layout/forms/FormLayout";
import Tab from "@components/tabs/Tab";

export default function SpecificForm() {
  return (
    <FormLayout title="Form 1">
      <Tab />
    </FormLayout>
  );
}

SpecificForm.noLayout = true;