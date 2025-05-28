export interface Inspection {
  id: number;
  address: string;
  type: InspectionType;
  status: InspectionStatus;
  deadline: string;
  description: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  formData?: InspectionFormData;
}

export enum InspectionType {
  TECHNICAL = 'Technisch',
  MAINTENANCE = 'Onderhoud', 
  DAMAGE = 'Schade',
  RENOVATION = 'Renovatie'
}

export enum InspectionStatus {
  PLANNED = 'Gepland',
  IN_PROGRESS = 'In Uitvoering',
  COMPLETED = 'Afgerond',
  URGENT = 'Urgent'
}

export interface InspectionSection {
  status: 'good' | 'maintenance' | 'repair' | 'replace';
  notes: string;
  photos: string[];
}

export interface DamageSection {
  location: string;
  isNew: string;
  type: string;
  date: string;
  requiresAction: string;
  description: string;
  photos: string[];
}

export interface MaintenanceSection {
  location: string;
  type: string;
  requiresAction: string;
  costIndication: string;
  photos: string[];
}

export interface TechnicalSection {
  location: string;
  type: string;
  reported_issues: string;
  approved: string;
  notes: string;
  photos: string[];
}

export interface ModificationsSection {
  location: string;
  executedBy: string;
  description: string;
  action: string;
  notes: string;
  photos: string[];
}

export interface InspectionFormData {
  damage: DamageSection;
  maintenance: MaintenanceSection;
  technical: TechnicalSection;
  modifications: ModificationsSection;
}

export type InspectionFormSection = keyof InspectionFormData;
