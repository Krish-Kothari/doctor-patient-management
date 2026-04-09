"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, AlertCircle } from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { PatientWithLastVisit } from "@/types"
import { format } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { deletePatient } from "@/lib/actions/patients"
import { useRouter } from "next/navigation"

interface PatientTableProps {
  patients: PatientWithLastVisit[]
}

export function PatientTable({ patients }: PatientTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const { error } = await deletePatient(deleteId)
      if (error) {
        toast.error(error)
      } else {
        toast.success("Patient deleted successfully")
        router.refresh()
      }
    } catch (error) {
      toast.error("Failed to delete patient")
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const filteredPatients = patients.filter(patient => 
    patient.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name, phone or ID..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/patients/new">
          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age / Gender</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-slate-50/50 cursor-pointer group">
                  <TableCell className="font-medium">
                    <Link href={`/patients/${patient.id}`} className="block">
                      <div className="flex flex-col">
                        <span className="text-slate-900">{patient.full_name}</span>
                        <span className="text-xs text-slate-400">ID: {patient.id.slice(0, 8)}</span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <span className="capitalize">{patient.gender || "N/A"}</span>
                      {patient.date_of_birth && (
                        <Badge variant="outline" className="font-normal text-slate-500">
                          {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} yrs
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>
                    {patient.last_visit_date ? (
                      <span className="text-slate-600">
                        {format(new Date(patient.last_visit_date), "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-sm">No visits yet</span>
                    )}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/patients/${patient.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/patients/${patient.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Info
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setDeleteId(patient.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  {searchQuery ? "No patients match your search." : "No patients found. Click 'Add New Patient' to get started."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
              <AlertCircle size={24} />
            </div>
            <DialogTitle className="text-center">Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-center">
              This action cannot be undone. This will permanently delete the patient record
              and all associated visit history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
