"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormContext, formSchema } from "../form-context.tsx"
import FormNavigation from "../form-navigation.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"

// Extract only the fields needed for this step
const educationSchema = z.object({
  educationLevel: formSchema.shape.educationLevel,
  institution: formSchema.shape.institution,
  fieldOfStudy: formSchema.shape.fieldOfStudy,
  graduationYear: formSchema.shape.graduationYear,
})

type EducationValues = z.infer<typeof educationSchema>

export default function EducationStep() {
  const { formData, updateFormData } = useFormContext()
  const [, setIsSubmitting] = useState(false)

  // Get current year for validation
  const currentYear = new Date().getFullYear()

  // Initialize form with existing values
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educationLevel: formData.educationLevel || "other",
      institution: formData.institution || "",
      fieldOfStudy: formData.fieldOfStudy || "",
      graduationYear: formData.graduationYear || "",
    },
  })

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
        <h2 className="text-2xl font-bold mb-2">Education Background</h2>
        <p className="text-gray-500">Tell us about your educational background</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="School or university name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Major or concentration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1950"
                    max={currentYear + 10}
                    placeholder={currentYear.toString()}
                    {...field}
                  />
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

