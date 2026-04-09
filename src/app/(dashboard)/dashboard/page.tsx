import { getPatients } from "@/lib/actions/patients"
import { PatientTable } from "@/components/patients/patient-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, Clock } from "lucide-react"

export default async function DashboardPage() {
  const { data: patients, error } = await getPatients()

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 font-medium">Error loading patients: {error}</p>
      </div>
    )
  }

  const validPatients = patients || []
  
  // Calculate some stats
  const totalPatients = validPatients.length
  const recentVisits = validPatients.filter(p => {
    if (!p.last_visit_date) return false
    const lastVisit = new Date(p.last_visit_date)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return lastVisit >= sevenDaysAgo
  }).length

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, Doctor</h1>
        <p className="text-slate-500 mt-1">Manage your patient records and medical history.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalPatients}</div>
            <p className="text-xs text-slate-400 mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Weekly Visits</CardTitle>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{recentVisits}</div>
            <p className="text-xs text-slate-400 mt-1">Average 5 per day</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Today's Schedule</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8</div>
            <p className="text-xs text-slate-400 mt-1">3 completed</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Patient Growth</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12%</div>
            <p className="text-xs text-slate-400 mt-1">Increase since last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Recent Patients</h2>
        </div>
        <PatientTable patients={validPatients} />
      </div>
    </div>
  )
}
