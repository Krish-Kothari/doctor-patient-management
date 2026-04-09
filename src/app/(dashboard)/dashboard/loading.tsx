import { PatientTableSkeleton } from "@/components/patients/patient-skeleton"

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-64 bg-slate-200 animate-pulse rounded-md" />
        <div className="h-4 w-96 bg-slate-100 animate-pulse rounded-md mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-xl" />
        ))}
      </div>

      <PatientTableSkeleton />
    </div>
  )
}
