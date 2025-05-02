"use client"

import { useFormContext } from "./form-context.tsx"
import { Check } from "lucide-react"

export default function StepIndicator() {
  const { currentStep, totalSteps, setCurrentStep } = useFormContext()

  // Create an array of step numbers (excluding the summary step)
  const steps = Array.from({ length: totalSteps - 1 }, (_, i) => i + 1)

  return (
    <div className="relative mb-8">
      {/* Progress bar background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1 w-full bg-gray-200 rounded-full" />

      {/* Progress bar fill */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      />

      {/* Step indicators */}
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <button
            type="button"
            key={step}
            onClick={() => currentStep > step && setCurrentStep(step)}
            disabled={currentStep < step}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all
              ${
                currentStep > step
                  ? "bg-primary text-primary-foreground cursor-pointer"
                  : currentStep === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-400"
              }
            `}
            aria-label={`Go to step ${step}`}
          >
            {currentStep > step ? <Check className="w-5 h-5" /> : step}
          </button>
        ))}

        {/* Summary step */}
        <button
          type="button"
          disabled={currentStep < totalSteps}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all
            ${currentStep === totalSteps ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-400"}
          `}
          aria-label="Summary"
        >
          S
        </button>
      </div>
    </div>
  )
}

