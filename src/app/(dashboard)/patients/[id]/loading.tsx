import { PatientDetailsSkeleton } from "@/components/patients/patient-skeleton"

export default function Loading() {
  return (
    <div className="animate-in fade-in duration-500">
      <PatientDetailsSkeleton />
    </div>
  )
}
