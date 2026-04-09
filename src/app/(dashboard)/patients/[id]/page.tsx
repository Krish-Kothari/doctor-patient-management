import { getPatientById } from "@/lib/actions/patients"
import { format } from "date-fns"
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  Clock, 
  FileText,
  Edit,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddVisitDialog } from "@/components/patients/add-visit-dialog"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PatientDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: patient, error } = await getPatientById(params.id)

  if (error || !patient) {
    return notFound()
  }

  const visits = patient.visits || []
  const sortedVisits = [...visits].sort((a, b) => 
    new Date(b.visit_date).getTime() - new Date(a.visit_date).getTime()
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{patient.full_name}</h1>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                {patient.id.slice(0, 8)}
              </Badge>
            </div>
            <p className="text-slate-500 flex items-center gap-2 mt-1">
              <User className="h-4 w-4" />
              <span className="capitalize">{patient.gender || "Not specified"}</span>
              {patient.date_of_birth && (
                <>
                  <span className="text-slate-300">•</span>
                  <span>{format(new Date(patient.date_of_birth), "MMM d, yyyy")}</span>
                  <span className="text-slate-300">•</span>
                  <span>{new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} years old</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/patients/${patient.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
          <AddVisitDialog patientId={patient.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-blue-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Phone</p>
                  <p className="text-slate-900">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</p>
                  <p className="text-slate-900">{patient.email || "No email provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="text-slate-900 whitespace-pre-line">{patient.address || "No address provided"}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Emergency Contact</p>
                    <p className="text-slate-900">{patient.emergency_contact || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 text-sm">Total Visits</span>
                <span className="font-semibold">{visits.length}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 text-sm">Last Visit</span>
                <span className="font-semibold">
                  {sortedVisits[0] ? format(new Date(sortedVisits[0].visit_date), "MMM d, yyyy") : "Never"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visits and Records */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="visits" className="w-full">
            <TabsList className="bg-white p-1 h-12 shadow-sm border-none w-full md:w-auto">
              <TabsTrigger value="visits" className="h-10 px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Visit History
              </TabsTrigger>
              <TabsTrigger value="info" className="h-10 px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Medical Records
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visits" className="mt-6 space-y-4">
              {sortedVisits.length > 0 ? (
                sortedVisits.map((visit) => (
                  <Card key={visit.id} className="border-none shadow-sm overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{visit.reason}</p>
                          <p className="text-xs text-slate-500">{format(new Date(visit.visit_date), "MMMM d, yyyy 'at' h:mm a")}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white">Routine</Badge>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                          <FileText className="h-3 w-3" />
                          Clinical Notes
                        </h4>
                        <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                          {visit.notes || "No clinical notes provided for this visit."}
                        </p>
                      </div>
                      {visit.prescriptions && (
                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                          <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-2 mb-2">
                            <Activity className="h-3 w-3" />
                            Prescriptions & Plan
                          </h4>
                          <p className="text-blue-900 whitespace-pre-line text-sm leading-relaxed">
                            {visit.prescriptions}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="p-4 bg-slate-50 rounded-full mb-4 text-slate-400">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No visit history yet</h3>
                  <p className="text-slate-500 mb-6">Start tracking this patient's medical journey.</p>
                  <AddVisitDialog patientId={patient.id} />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="info" className="mt-6">
              <Card className="border-none shadow-sm">
                <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Lab Reports & Documents</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">
                    Storage for patient documents, lab reports, and imaging will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
