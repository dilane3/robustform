import DashboardLayout from "@components/layout/forms/DashboardLayout";
import EmptyForm from "@components/pages/forms/Empty";

export default function Forms() {
  return (
    <DashboardLayout>
      <EmptyForm />
    </DashboardLayout>
  )
}

Forms.noLayout = true;