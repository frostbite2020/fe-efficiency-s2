import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormContext, formSchema } from "../form-context.tsx"
import FormNavigation from "../form-navigation.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"

// Extract only the fields needed for this step
const contactInfoSchema = z.object({
  email: formSchema.shape.email,
  phone: formSchema.shape.phone,
  address: formSchema.shape.address,
  city: formSchema.shape.city,
  zipCode: formSchema.shape.zipCode,
})

type ContactInfoValues = z.infer<typeof contactInfoSchema>

export default function ContactInfoStep() {
  const { formData, updateFormData } = useFormContext()
  const [, setIsSubmitting] = useState(false)

  // Initialize form with existing values
  const form = useForm<ContactInfoValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: formData.email || "",
      phone: formData.phone || "",
      address: formData.address || "",
      city: formData.city || "",
      zipCode: formData.zipCode || "",
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
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-gray-500">How can we reach you?</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
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

