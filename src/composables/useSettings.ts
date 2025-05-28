import { ref } from 'vue';

interface AppSettings {
  largeText: boolean;
  notifications: boolean;
  deadlineReminders: boolean;
  notificationSound: boolean;
  vibration: boolean;
  biometricLock: boolean;
  locationAccess: boolean;
}

const defaultSettings: AppSettings = {
  largeText: false,
  notifications: true,
  deadlineReminders: true,
  notificationSound: true,
  vibration: true,
  biometricLock: false,
  locationAccess: false,
};

const appSettings = ref<AppSettings>({ ...defaultSettings });

export function useSettings() {
  const toggle = (key: keyof AppSettings) => {
    appSettings.value[key] = !appSettings.value[key];
    localStorage.setItem('appSettings', JSON.stringify(appSettings.value));
  };
  const load = () => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      appSettings.value = { ...defaultSettings, ...JSON.parse(saved) };
    }
  };
  const checkUpdates = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const openPrivacyPolicy = () => {
    window.open('https://realestate-care.nl/privacy-policy', '_blank');
  };
  const openTerms = () => {
    window.open('https://realestate-care.nl/terms', '_blank');
  };

  load();

  return {
    settings: appSettings,
    toggleSetting: toggle,
    loadSettings: load,
    checkForUpdates: checkUpdates,
    showPrivacyPolicy: openPrivacyPolicy,
    showTerms: openTerms,
  };
}
