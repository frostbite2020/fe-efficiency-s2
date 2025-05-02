import { useFormContext } from "./form-context.tsx"
import { Button } from "@/components/ui/button.tsx"

type FormNavigationProps = {
  onNext?: () => boolean | Promise<boolean>
  showBack?: boolean
  showNext?: boolean
  nextLabel?: string
  isLastStep?: boolean
}

export default function FormNavigation({
  onNext,
  showBack = true,
  showNext = true,
  nextLabel = "Next",
  isLastStep = false,
}: FormNavigationProps) {
  const { currentStep, setCurrentStep, totalSteps, submitForm, isSubmitting } = useFormContext()

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = async () => {
    // If onNext is provided, call it and only proceed if it returns true
    if (onNext) {
      const canProceed = await onNext()
      if (!canProceed) return
    }

    if (isLastStep) {
      submitForm()
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="flex justify-between mt-8">
      {showBack ? (
        <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1 || isSubmitting}>
          Back
        </Button>
      ) : (
        <div /> // Empty div to maintain spacing with flex justify-between
      )}

      {showNext && (
        <Button type="button" onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : isLastStep ? "Submit" : nextLabel}
        </Button>
      )}
    </div>
  )
}

