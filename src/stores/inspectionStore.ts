import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Inspection } from '../types/inspection'
import { InspectionStatus } from '../types/inspection'
import { getAssignedInspections, getCompletedInspections, changeInspectionStatus, findInspectionById } from '../services/inspectionService'

export const useInspectionStore = defineStore('inspection', () => {
  const assignedList = ref<Inspection[]>([])
  const completedList = ref<Inspection[]>([])
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const allInspections = computed(() => [
    ...assignedList.value,
    ...completedList.value
  ])

  const totalCount = computed(() => allInspections.value.length)

  const urgentInspections = computed(() => 
    allInspections.value.filter(inspection => inspection.status === InspectionStatus.URGENT)
  )

  const loadAssignedInspections = async () => {
    loading.value = true
    errorMessage.value = null
    
    try {
      assignedList.value = await getAssignedInspections()
    } catch (err) {
      errorMessage.value = 'Fout bij het laden van toegewezen inspecties'
    } finally {
      loading.value = false
    }
  }

  const loadCompletedInspections = async () => {
    loading.value = true
    errorMessage.value = null
    
    try {
      completedList.value = await getCompletedInspections()
    } catch (err) {
      errorMessage.value = 'Fout bij het laden van uitgevoerde inspecties'
    } finally {
      loading.value = false
    }
  }
  const loadAllInspections = async () => {
    await Promise.all([
      loadAssignedInspections(),
      loadCompletedInspections()
    ])
  }

  const updateInspectionStatus = async (id: number, status: InspectionStatus) => {
    await changeInspectionStatus(id, status)
    await loadAllInspections()
  }
  const updateInspection = async (updatedInspection: Inspection) => {
    const isCompleted = updatedInspection.status === InspectionStatus.COMPLETED
    const targetList = isCompleted ? completedList : assignedList
    const idx = targetList.value.findIndex((inspection: Inspection) => inspection.id === updatedInspection.id)
    
    if (idx !== -1) {
      targetList.value[idx] = updatedInspection
    }
  }

  const findInspectionById = (id: number) => {
    return allInspections.value.find((inspection: Inspection) => inspection.id === id)
  }
  const clearError = () => {
    errorMessage.value = null
  }

  return {
    assignedInspections: assignedList,
    completedInspections: completedList,
    isLoading: loading,
    error: errorMessage,
    allInspections,
    totalInspections: totalCount,
    urgentInspections,
    loadAssignedInspections,
    loadCompletedInspections,
    loadAllInspections,
    updateInspectionStatus,
    updateInspection,
    getInspectionById: findInspectionById,
    clearError
  }
})