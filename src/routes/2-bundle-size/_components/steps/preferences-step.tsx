"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormContext, formSchema } from "../form-context.tsx"
import FormNavigation from "../form-navigation.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form.tsx"

// Extract only the fields needed for this step
const preferencesSchema = z.object({
  notifications: formSchema.shape.notifications,
  marketingEmails: formSchema.shape.marketingEmails,
  theme: formSchema.shape.theme,
  language: formSchema.shape.language,
})

type PreferencesValues = z.infer<typeof preferencesSchema>

export default function PreferencesStep() {
  const { formData, updateFormData } = useFormContext()
  const [, setIsSubmitting] = useState(false)

  // Initialize form with existing values
  const form = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notifications: formData.notifications ?? false,
      marketingEmails: formData.marketingEmails ?? false,
      theme: formData.theme || "system",
      language: formData.language || "english",
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
        <h2 className="text-2xl font-bold mb-2">Preferences</h2>
        <p className="text-gray-500">Customize your experience</p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Communication Preferences</h3>

            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Notifications</FormLabel>
                    <FormDescription>Receive notifications about account activity and updates</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Marketing Emails</FormLabel>
                    <FormDescription>Receive emails about new features, promotions, and offers</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Display Preferences</h3>

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose how the application appears</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your preferred language</FormDescription>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <FormNavigation onNext={handleNext} />
    </div>
  )
}

