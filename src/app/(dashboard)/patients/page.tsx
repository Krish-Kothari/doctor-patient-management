import { getPatients } from "@/lib/actions/patients"
import { PatientTable } from "@/components/patients/patient-table"

export default async function PatientsPage() {
  const { data: patients, error } = await getPatients()

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 font-medium">Error loading patients: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Patient Database</h1>
          <p className="text-slate-500 mt-1">View and manage all registered patients.</p>
        </div>
      </div>

      <PatientTable patients={patients || []} />
    </div>
  )
}
