import { InspectionType, InspectionStatus } from '@/types/inspection.js'

const API_BASE = 'https://my-json-server.typicode.com/QAS5/RealEstateCare'

export async function getAssignedInspections() {
  try {
    const response = await fetch(`${API_BASE}/assigned-inspections`)
    if (!response.ok) {
      throw new Error('Failed to fetch assigned inspections')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching assigned inspections:', error)
    return getFallbackAssignedInspections()
  }
}

export async function getCompletedInspections() {
  try {
    const response = await fetch(`${API_BASE}/completed-inspections`)
    if (!response.ok) {
      throw new Error('Failed to fetch completed inspections')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching completed inspections:', error)
    return getFallbackCompletedInspections()
  }
}

export async function updateInspectionStatus(id, status) {
  try {
    const response = await fetch(`${API_BASE}/assigned-inspections/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update inspection status')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating inspection status:', error)
    const saved = localStorage.getItem('assigned_inspections')
    const assignedList = saved ? JSON.parse(saved) : getFallbackAssignedInspections()
    const completedList = JSON.parse(localStorage.getItem('completed_inspections') || '[]')
    
    const index = assignedList.findIndex(item => item.id === id)
    if (index === -1) return
    
    const inspection = assignedList[index]
    
    if (status === InspectionStatus.COMPLETED) {
      inspection.status = status
      inspection.completedAt = new Date().toISOString().split('T')[0]
      assignedList.splice(index, 1)
      completedList.push(inspection)
      localStorage.setItem('completed_inspections', JSON.stringify(completedList))
    } else {
      inspection.status = status
    }
    
    localStorage.setItem('assigned_inspections', JSON.stringify(assignedList))
  }
}

export async function findInspectionById(id) {
  const assigned = await getAssignedInspections()
  const completed = await getCompletedInspections()
  return [...assigned, ...completed].find(item => item.id === id)
}

function getFallbackAssignedInspections() {
  return [
    {
      id: 1,
      address: 'Prinsengracht 263, Amsterdam',
      type: InspectionType.TECHNICAL,
      status: InspectionStatus.PLANNED,
      deadline: '2024-01-15',
      description: 'CV-ketel onderhoud',
      assignedTo: 'Jan Jansen',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      address: 'Vondelstraat 45, Amsterdam', 
      type: InspectionType.MAINTENANCE,
      status: InspectionStatus.PLANNED,
      deadline: '2024-01-18',
      description: 'Lekkage dakgoot',
      assignedTo: 'Piet de Vries',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      address: 'Keizersgracht 124, Amsterdam',
      type: InspectionType.DAMAGE,
      status: InspectionStatus.PLANNED,
      deadline: '2024-01-20',
      description: 'Stopcontact defect',
      assignedTo: 'Marie Bakker',
      createdAt: '2024-01-14'
    }
  ]
}

function getFallbackCompletedInspections() {
  return [
    {
      id: 101,
      address: 'Herengracht 89, Amsterdam',
      type: InspectionType.TECHNICAL,
      status: InspectionStatus.COMPLETED,
      deadline: '2024-01-10',
      description: 'Brandmelder check',
      assignedTo: 'Jan Jansen',
      createdAt: '2024-01-08',
      completedAt: '2024-01-10',
      formData: {
        damage: {
          location: 'Woonkamer',
          isNew: 'no',
          type: 'slijtage',
          date: '2024-01-10',
          requiresAction: 'no',
          description: 'Kleine schade aan verf',
          photos: ['Bijlage foto 1', 'Bijlage foto 2']
        },
        maintenance: {
          location: 'Keuken',
          type: 'elektra',
          requiresAction: 'yes',
          costIndication: '0-500',
          photos: []
        },
        technical: {
          location: 'Hal',
          type: 'beveiliging',
          reported_issues: 'Brandmelder piept',
          approved: 'yes',
          notes: 'Batterij vervangen',
          photos: []
        },
        modifications: {
          location: '',
          executedBy: '',
          description: '',
          action: '',
          notes: '',
          photos: []
        }
      }
    },
    {
      id: 102,
      address: 'Damrak 12, Amsterdam',
      type: InspectionType.MAINTENANCE,
      status: InspectionStatus.COMPLETED,
      deadline: '2024-01-08',
      description: 'Airco service',
      assignedTo: 'Piet de Vries',
      createdAt: '2024-01-06',
      completedAt: '2024-01-09',
      formData: {
        damage: {
          location: '',
          isNew: 'no',
          type: '',
          date: '2024-01-09',
          requiresAction: 'no',
          description: '',
          photos: []
        },
        maintenance: {
          location: 'Woonkamer',
          type: 'luchtverversing',
          requiresAction: 'no',
          costIndication: '500-1500',
          photos: []
        },
        technical: {
          location: 'Woonkamer',
          type: 'luchtverversing',
          reported_issues: 'Airco maakt geluid',
          approved: 'yes',
          notes: 'Filter schoongemaakt',
          photos: []
        },
        modifications: {
          location: '',
          executedBy: '',
          description: '',
          action: '',
          notes: '',
          photos: []
        }
      }
    }
  ]
}
