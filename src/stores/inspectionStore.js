import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { InspectionStatus } from '../types/inspection.js'
import { getAssignedInspections, getCompletedInspections, updateInspectionStatus } from '../services/inspectionService.js'

export const useInspectionStore = defineStore('inspection', () => {
  const assignedInspections = ref([])
  const completedInspections = ref([])
  const isLoading = ref(false)

  const allInspections = computed(() => [...assignedInspections.value, ...completedInspections.value])
  const urgentInspections = computed(() => allInspections.value.filter(item => item.status === InspectionStatus.URGENT))

  async function loadAssignedInspections() {
    isLoading.value = true
    try {
      assignedInspections.value = await getAssignedInspections()
    } catch (error) {
      console.error('Error loading assigned inspections:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function loadCompletedInspections() {
    isLoading.value = true
    try {
      completedInspections.value = await getCompletedInspections()
    } catch (error) {
      console.error('Error loading completed inspections:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function loadAllInspections() {
    await Promise.all([loadAssignedInspections(), loadCompletedInspections()])
  }

  async function updateInspection(inspection) {
    try {
      // Update the inspection in the appropriate array
      const completedIndex = completedInspections.value.findIndex(item => item.id === inspection.id)
      if (completedIndex !== -1) {
        completedInspections.value[completedIndex] = inspection
      }
      
      const assignedIndex = assignedInspections.value.findIndex(item => item.id === inspection.id)
      if (assignedIndex !== -1) {
        assignedInspections.value[assignedIndex] = inspection
      }
    } catch (error) {
      console.error('Error updating inspection:', error)
      throw error
    }
  }
  async function updateStatus(id, status) {
    try {
      await updateInspectionStatus(id, status)
      await loadAllInspections()
    } catch (error) {
      console.error('Error updating inspection status:', error)
      throw error
    }
  }

  function findInspectionById(id) {
    return allInspections.value.find(item => item.id === id)
  }
  return {
    assignedInspections,
    completedInspections,
    isLoading,
    allInspections,
    urgentInspections,
    loadAssignedInspections,
    loadCompletedInspections,
    loadAllInspections,
    updateInspection,
    updateStatus,
    findInspectionById
  }
})
