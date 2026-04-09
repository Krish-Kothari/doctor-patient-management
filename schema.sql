-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  address TEXT,
  emergency_contact TEXT
);

-- Visits Table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  visit_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  reason TEXT NOT NULL,
  notes TEXT,
  prescriptions TEXT
);

-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Policies for Authenticated Doctors
CREATE POLICY "Allow authenticated users to read patients" ON patients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert patients" ON patients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update patients" ON patients FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete patients" ON patients FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read visits" ON visits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert visits" ON visits FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update visits" ON visits FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete visits" ON visits FOR DELETE USING (auth.role() = 'authenticated');
