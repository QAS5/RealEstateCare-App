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

    // Only allow admin@example.com with password 'password'
    if (username !== 'admin@example.com' || password !== 'password') {
      throw new Error('Ongeldige inloggegevens')
    }

    const userData = {
      username: 'admin@example.com',
      email: 'admin@example.com',
      name: 'Administrator',
      avatar: '/assets/images/default-avatar.png'
    }

    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const verify2FA = async (code) => {
    if (code !== '123456') {
      throw new Error('Ongeldige 2FA code')
    }
    return true
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
    updateProfile,
    verify2FA
  }
}
