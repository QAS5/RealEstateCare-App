import { ref } from 'vue';

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  name: string;
}

const DEFAULT_AVATAR = '/assets/images/default-avatar.png';

const user = ref<UserProfile | null>(null);
const isLoggedIn = ref(false);

export function useAuth() {  const loadUser = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      user.value = JSON.parse(stored);
      isLoggedIn.value = true;
    }
  };

  const login = async (username: string, password: string) => {    if (!username || !password) {
      throw new Error('Invalid credentials');
    }

    const userData: UserProfile = {
      username,
      email: `${username}@realestate-care.nl`, 
      avatar: DEFAULT_AVATAR,
      name: username
    };
    
    user.value = userData;
    isLoggedIn.value = true;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('user');  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user.value) return;
    
    user.value = { ...user.value, ...updates };
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const updateAvatar = (url: string) => {    if (user.value) {
      user.value.avatar = url;
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  };

  loadUser();

  return {
    user,
    isAuthenticated: isLoggedIn,
    login,
    logout,
    updateProfile,
    updateAvatar
  };
}
