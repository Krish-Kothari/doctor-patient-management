"use server"

import { createClient } from "@/utils/supabase/server"
import { Patient, PatientWithLastVisit, Visit } from "@/types"
import { revalidatePath } from "next/cache"

export async function getPatients() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("patients")
    .select("*, visits(visit_date)")
    .order("created_at", { ascending: false })

  if (error) return { error: error.message }

  // Map to include last visit date
  const patientsWithLastVisit: PatientWithLastVisit[] = (data ?? []).map((patient) => {
    const typedPatient = patient as Patient & { visits?: { visit_date: string }[] }
    const lastVisit = typedPatient.visits?.[0]?.visit_date
    return {
      ...typedPatient,
      last_visit_date: lastVisit
    }
  })

  return { data: patientsWithLastVisit }
}

export async function getPatientById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("patients")
    .select("*, visits(*)")
    .eq("id", id)
    .single()

  if (error) return { error: error.message }
  return { data }
}

export async function createPatient(patient: Omit<Patient, "id" | "created_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("patients")
    .insert(patient)
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath("/dashboard")
  revalidatePath("/patients")
  return { data }
}

export async function updatePatient(id: string, patient: Partial<Patient>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id)
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath(`/dashboard`)
  revalidatePath(`/patients/${id}`)
  return { data }
}

export async function deletePatient(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)

  if (error) return { error: error.message }
  
  revalidatePath("/dashboard")
  revalidatePath("/patients")
  return { success: true }
}

export async function createVisit(visit: Omit<Visit, "id">) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("visits")
    .insert(visit)
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath(`/patients/${visit.patient_id}`)
  return { data }
}
