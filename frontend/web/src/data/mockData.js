export const mockUsers = {
  patient: {
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    phone: '+1-555-0123',
    address: '123 Health St, Medical City',
    email: 'john.doe@email.com',
    linkedDoctor: 'Dr. Sarah Smith',
    linkedHospital: 'City General Hospital',
    linkedInsurance: 'HealthCare Plus'
  },
  doctor: {
    name: 'Dr. Sarah Smith',
    specialization: 'Cardiology',
    license: 'MD-12345',
    hospital: 'City General Hospital',
    phone: '+1-555-0456',
    email: 'sarah.smith@hospital.com',
    patients: ['John Doe', 'Jane Wilson', 'Mike Johnson']
  },
  hospital: {
    name: 'City General Hospital',
    registrationNumber: 'HOS-2024-001',
    address: '456 Medical Ave, Health District',
    email: 'contact@cityhospital.com',
    phone: '+1-555-0789',
    doctors: ['Dr. Sarah Smith', 'Dr. Michael Brown', 'Dr. Emily Davis'],
    patients: ['John Doe', 'Jane Wilson', 'Mike Johnson', 'Sarah Lee']
  },
  insurance: {
    name: 'HealthCare Plus',
    license: 'INS-2024-789',
    contactPerson: 'Robert Anderson',
    phone: '+1-555-0999',
    email: 'contact@healthcareplus.com',
    coveredPatients: ['John Doe', 'Jane Wilson', 'Mike Johnson'],
    linkedHospitals: ['City General Hospital', 'Metro Medical Center']
  }
};

export const mockVitals = {
  heartRate: 72,
  spo2: 98,
  status: 'Normal'
};

export const mockPendingUsers = [
  { id: 1, name: 'Alice Cooper', role: 'doctor', email: 'alice@email.com', date: '2024-01-15' },
  { id: 2, name: 'Bob Martin', role: 'patient', email: 'bob@email.com', date: '2024-01-16' },
  { id: 3, name: 'Metro Hospital', role: 'hospital', email: 'metro@hospital.com', date: '2024-01-17' }
];

export const mockApprovedUsers = [
  { id: 4, name: 'John Doe', role: 'patient', email: 'john.doe@email.com', date: '2024-01-10' },
  { id: 5, name: 'Dr. Sarah Smith', role: 'doctor', email: 'sarah.smith@hospital.com', date: '2024-01-11' }
];

export const hospitalOptions = [
  'City General Hospital',
  'Metro Medical Center',
  'Central Health Institute',
  'Community Care Hospital'
];
