export interface Patient {
  id: string;
  created_at: string;
  full_name: string;
  date_of_birth: string | null;
  gender: string | null;
  phone: string;
  email: string | null;
  address: string | null;
  emergency_contact: string | null;
}

export interface Visit {
  id: string;
  patient_id: string;
  visit_date: string;
  reason: string;
  notes: string | null;
  prescriptions: string | null;
}

export interface PatientWithLastVisit extends Patient {
  last_visit_date?: string;
}
