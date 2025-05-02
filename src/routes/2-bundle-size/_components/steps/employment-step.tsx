import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormContext, formSchema } from "../form-context.tsx"
import FormNavigation from "../form-navigation.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"

// Create a dynamic schema based on employment status
const createEmploymentSchema = (employmentStatus: string | undefined) => {
  // Base schema with employment status
  const baseSchema = z.object({
    employmentStatus: formSchema.shape.employmentStatus,
    yearsOfExperience: z.string().optional(),
  })

  // If employed or self-employed, require company and job title
  if (employmentStatus === "employed" || employmentStatus === "self-employed") {
    return baseSchema.extend({
      company: z.string().min(1, "Company name is required"),
      jobTitle: z.string().min(1, "Job title is required"),
    })
  }

  // Otherwise, make them optional
  return baseSchema.extend({
    company: z.string().optional(),
    jobTitle: z.string().optional(),
  })
}

export default function EmploymentStep() {
  const { formData, updateFormData } = useFormContext()
  const [, setIsSubmitting] = useState(false)
  const [employmentStatus, setEmploymentStatus] = useState(formData.employmentStatus)

  // Create a form with dynamic validation based on employment status
  const form = useForm<any>({
    resolver: zodResolver(createEmploymentSchema(employmentStatus)),
    defaultValues: {
      employmentStatus: formData.employmentStatus || "",
      company: formData.company || "",
      jobTitle: formData.jobTitle || "",
      yearsOfExperience: formData.yearsOfExperience || "",
    },
  })

  // Update validation when employment status changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    form.trigger()
  }, [employmentStatus, form])

  const handleNext = async () => {
    setIsSubmitting(true)
    const valid = await form.trigger()
    setIsSubmitting(false)

    if (valid) {
      const values = form.getValues()
      updateFormData(values)
      return true
    }

    return false
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Employment Information</h2>
        <p className="text-gray-500">Tell us about your work experience</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    // @ts-expect-error because type is string
                      setEmploymentStatus(value)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(employmentStatus === "employed" || employmentStatus === "self-employed") && (
            <>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="50" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <FormNavigation onNext={handleNext} />
    </div>
  )
}

