import { Inspection, InspectionType, InspectionStatus } from '@/types/inspection'

const BASE_URL = 'http://localhost:3001'
const STORAGE_ASSIGNED = 'assigned_inspections'
const STORAGE_COMPLETED = 'completed_inspections'

const assigned: Inspection[] = [
  {
    id: 1,
    address: 'Prinsengracht 263, Amsterdam',
    type: InspectionType.TECHNICAL,
    status: InspectionStatus.PLANNED,
    deadline: '2024-01-15',
    description: 'Jaarlijkse controle van het verwarmingssysteem en CV-ketel',
    assignedTo: 'Jan Jansen',
    createdAt: '2024-01-10'
  },
  { id: 2, 
    address: 'Vondelstraat 45, Amsterdam',
    type: InspectionType.MAINTENANCE,
    status: InspectionStatus.PLANNED,
    deadline: '2024-01-18',
    description: 'Inspectie van de dakgoot en afvoersystemen',
    assignedTo: 'Piet de Vries',
    createdAt: '2024-01-12' },
  {
    id: 3,
    address: 'Keizersgracht 124, Amsterdam', 
    type: InspectionType.DAMAGE,
    status: InspectionStatus.PLANNED,
    deadline: '2024-01-20',
    description: 'Controle van elektrische installaties en veiligheid',
    assignedTo: 'Marie Bakker',
    createdAt: '2024-01-14'
  }
]

const completed: Inspection[] = [
  {
    id: 101,
    address: 'Herengracht 89, Amsterdam',
    type: InspectionType.TECHNICAL,
    status: InspectionStatus.COMPLETED,
    deadline: '2024-01-10',
    description: 'Jaarlijkse veiligheidscontrole afgerond',
    assignedTo: 'Jan Jansen',
    createdAt: '2024-01-08',
    completedAt: '2024-01-10'
  },
  {
    id: 102,
    address: 'Damrak 12, Amsterdam',
    type: InspectionType.MAINTENANCE,
    status: InspectionStatus.COMPLETED,
    deadline: '2024-01-08',
    description: 'HVAC systeem onderhoud voltooid',
    assignedTo: 'Piet de Vries',
    createdAt: '2024-01-06',
    completedAt: '2024-01-09'
  }
]

export const getAssignedInspections = async (): Promise<Inspection[]> => {
  await new Promise(resolve => setTimeout(resolve, 420))
  
  const saved = localStorage.getItem(STORAGE_ASSIGNED)
  if (saved) {
    return JSON.parse(saved)
  }
  
  localStorage.setItem(STORAGE_ASSIGNED, JSON.stringify(assigned))
  return assigned
}

export const getCompletedInspections = async (): Promise<Inspection[]> => {
  await new Promise(resolve => setTimeout(resolve, 280))
  
  const saved = localStorage.getItem(STORAGE_COMPLETED)
  if (saved) {
    return JSON.parse(saved)
  }
  
  localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completed))
  return completed
}

export const changeInspectionStatus = async (
  inspectionId: number, 
  newStatus: InspectionStatus,
  findings?: string
): Promise<void> => {
  const assignedList = JSON.parse(localStorage.getItem(STORAGE_ASSIGNED) || '[]')
  const completedList = JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '[]')
  
  const inspectionIndex = assignedList.findIndex((inspection: Inspection) => inspection.id === inspectionId)
  
  if (inspectionIndex === -1) {
    throw new Error(`Inspection with id ${inspectionId} not found`)
  }
  
  const inspection = assignedList[inspectionIndex]
  if (newStatus === InspectionStatus.COMPLETED) {
    inspection.status = InspectionStatus.COMPLETED
    inspection.completedAt = new Date().toISOString().split('T')[0]
    assignedList.splice(inspectionIndex, 1)
    completedList.push(inspection)
    
    localStorage.setItem(STORAGE_ASSIGNED, JSON.stringify(assignedList))
    localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedList))
  } else {
    inspection.status = newStatus
    localStorage.setItem(STORAGE_ASSIGNED, JSON.stringify(assignedList))
  }
}

export const findInspectionById = async (id: number): Promise<Inspection | null> => {
  const assignedList = await getAssignedInspections()
  const completedList = await getCompletedInspections()
  const allInspections = [...assignedList, ...completedList]
  return allInspections.find(inspection => inspection.id === id) || null
}
