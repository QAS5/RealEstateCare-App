import { ref } from 'vue'

const settings = ref({
  largeText: false,
  notifications: true,
  deadlineReminders: true,
  notificationSound: true,
  vibration: true,
  biometricLock: false,
  locationAccess: false
})

export function useSettings() {
  const load = () => {
    const saved = localStorage.getItem('settings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  }

  const toggle = (key) => {
    settings.value[key] = !settings.value[key]
    localStorage.setItem('settings', JSON.stringify(settings.value))
  }

  load()

  return { settings, toggle }
}
