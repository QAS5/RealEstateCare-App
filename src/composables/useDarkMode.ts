import { ref } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  const saved = localStorage.getItem('darkMode');
  
  if (saved) {
    isDark.value = saved === 'true';  }
  
  updateTheme();

  function updateTheme() {
    if (isDark.value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  const toggleDarkMode = (event?: any) => {
    if (event?.detail !== undefined) {
      isDark.value = event.detail.checked;
    } else {
      isDark.value = !isDark.value;
    }
    
    updateTheme();
    localStorage.setItem('darkMode', isDark.value.toString());
  };

  return {
    isDark,
    toggleDarkMode
  };
}
