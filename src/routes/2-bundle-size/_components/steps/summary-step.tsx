import { useFormContext } from "../form-context.tsx"
import FormNavigation from "../form-navigation.tsx"

export default function SummaryStep() {
  const { formData } = useFormContext()

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Summary</h2>
        <p className="text-gray-500">Please review your information before submitting</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-3">Personal Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">First Name</dt>
              <dd>{formData.firstName || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Last Name</dt>
              <dd>{formData.lastName || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Date of Birth</dt>
              <dd>{formatDate(formData.dateOfBirth || "")}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Gender</dt>
              <dd>{formData.gender || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-3">Contact Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Email</dt>
              <dd>{formData.email || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Phone</dt>
              <dd>{formData.phone || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Address</dt>
              <dd>{formData.address || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">City</dt>
              <dd>{formData.city || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">ZIP Code</dt>
              <dd>{formData.zipCode || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-3">Preferences</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Notifications</dt>
              <dd>{formData.notifications ? "Enabled" : "Disabled"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Marketing Emails</dt>
              <dd>{formData.marketingEmails ? "Enabled" : "Disabled"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Theme</dt>
              <dd>{formData.theme || "System"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Language</dt>
              <dd>{formData.language || "English"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-3">Employment Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Employment Status</dt>
              <dd>{formData.employmentStatus || "Not provided"}</dd>
            </div>
            {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
              <>
                <div className="flex justify-between md:block">
                  <dt className="text-gray-500 md:mb-1">Company</dt>
                  <dd>{formData.company || "Not provided"}</dd>
                </div>
                <div className="flex justify-between md:block">
                  <dt className="text-gray-500 md:mb-1">Job Title</dt>
                  <dd>{formData.jobTitle || "Not provided"}</dd>
                </div>
              </>
            )}
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Years of Experience</dt>
              <dd>{formData.yearsOfExperience || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-3">Education Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Education Level</dt>
              <dd>{formData.educationLevel || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Institution</dt>
              <dd>{formData.institution || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Field of Study</dt>
              <dd>{formData.fieldOfStudy || "Not provided"}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-gray-500 md:mb-1">Graduation Year</dt>
              <dd>{formData.graduationYear || "Not provided"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <FormNavigation isLastStep={true} nextLabel="Submit" />
    </div>
  )
}

