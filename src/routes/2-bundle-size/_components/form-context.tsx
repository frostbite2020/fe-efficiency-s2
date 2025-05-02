"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { z } from "zod"

// Define the form schema using Zod
export const formSchema = z.object({
  // Personal Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),

  // Contact Info
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),

  // Preferences
  notifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.enum(["english", "spanish", "french", "german", "other"]).default("english"),

  // Employment
  employmentStatus: z.enum(["employed", "self-employed", "unemployed", "student", "retired"]),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  yearsOfExperience: z.string().optional(),

  // Education
  educationLevel: z.enum(["high-school", "associate", "bachelor", "master", "doctorate", "other"]),
  institution: z.string().min(1, "Institution is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  graduationYear: z.string().min(4, "Graduation year is required"),
})

export type FormData = z.infer<typeof formSchema>

// Default form values
const defaultFormValues: Partial<FormData> = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  notifications: false,
  marketingEmails: false,
  theme: "system",
  language: "english",
  company: "",
  jobTitle: "",
  yearsOfExperience: "",
  institution: "",
  fieldOfStudy: "",
  graduationYear: "",
}

type FormContextType = {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  isSubmitting: boolean
  isSubmitted: boolean
  submitForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<FormData>>(defaultFormValues)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 6 // 5 form steps + summary

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const submitForm = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would submit the data to your API here
    console.log("Form submitted:", formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        totalSteps,
        isSubmitting,
        isSubmitted,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

