import { createFileRoute } from '@tanstack/react-router'
import FormWizard from "./_components/form-wizard.tsx";
import {FormProvider} from "./_components/form-context.tsx";

export const Route = createFileRoute('/2-bundle-size/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <FormProvider>
        <FormWizard />
      </FormProvider>
  )
}
