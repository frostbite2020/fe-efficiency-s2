import { useFormContext } from "./form-context.tsx"
import StepIndicator from "./step-indicator.tsx"
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Fragment} from "react";
import PersonalInfoStep from "./steps/personal-info-step.tsx";
import ContactInfoStep from "./steps/contact-info-step.tsx";
import PreferencesStep from "./steps/preferences-step.tsx";
import EmploymentStep from "./steps/employment-step.tsx";
import EducationStep from "./steps/education-step.tsx";
import SummaryStep from "./steps/summary-step.tsx";

export default function FormWizard() {
  const { currentStep, isSubmitted } = useFormContext()

  // Render the current step
  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="py-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h2>
          <p className="text-gray-600">Thank you for your submission. We'll be in touch soon.</p>
        </div>
      )
    }

    return (
      <Fragment>
        {currentStep === 1 && <PersonalInfoStep />}
        {currentStep === 2 && <ContactInfoStep />}
        {currentStep === 3 && <PreferencesStep />}
        {currentStep === 4 && <EmploymentStep />}
        {currentStep === 5 && <EducationStep />}
        {currentStep === 6 && <SummaryStep />}
      </Fragment>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <Card>
        <CardContent>
          {!isSubmitted && <StepIndicator />}
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  )
}

