import { getPatientById } from "@/lib/actions/patients"
import { PatientForm } from "@/components/patients/patient-form"
import { notFound } from "next/navigation"

export default async function EditPatientPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: patient, error } = await getPatientById(params.id)

  if (error || !patient) {
    return notFound()
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PatientForm initialData={patient} />
    </div>
  )
}
