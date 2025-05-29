import { ref } from 'vue'

const user = ref(null)
const isAuthenticated = ref(false)

export function useAuth() {  const loadUser = () => {
    const saved = localStorage.getItem('user')
    if (saved) {
      user.value = JSON.parse(saved)
      if (!user.value.avatar) {
        user.value.avatar = '/assets/images/default-avatar.png'
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      isAuthenticated.value = true
    }
  }
  const login = async (username, password) => {
    if (!username || !password) {
      throw new Error('Voer gebruikersnaam en wachtwoord in')
    }

    const userData = {
      username,
      email: `${username}@realestate-care.nl`,
      name: username,
      avatar: '/assets/images/default-avatar.png'
    }

    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const updateProfile = (updates) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  loadUser()
  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile
  }
}
