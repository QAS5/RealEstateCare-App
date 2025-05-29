import { ref } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    isDark.value = saved === 'true'
    document.body.classList.toggle('dark', isDark.value)
  }

  const toggle = () => {
    isDark.value = !isDark.value
    document.body.classList.toggle('dark', isDark.value)
    localStorage.setItem('darkMode', isDark.value.toString())
  }

  return { isDark, toggle }
}
