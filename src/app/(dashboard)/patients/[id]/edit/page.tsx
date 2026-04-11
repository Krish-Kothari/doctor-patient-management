import { getPatientById } from "@/lib/actions/patients"
import { PatientForm } from "@/components/patients/patient-form"
import { notFound } from "next/navigation"

export default async function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: patient, error } = await getPatientById(id)

  if (error || !patient) {
    return notFound()
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PatientForm initialData={patient} />
    </div>
  )
}
