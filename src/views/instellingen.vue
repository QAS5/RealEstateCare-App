<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title class="rec-text-heading">Instellingen</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">      <div class="header-image-container">
        <img src="/assets/images/header.png" alt="Settings Header" class="header-image" />
      </div>
      
      <div class="rec-card">
        <div class="user-profile">
          <div class="avatar-section">
            <img :src="user?.avatar" alt="Profile" class="avatar" />
            <ion-button fill="clear" size="small" class="change-avatar" @click="changeAvatar">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </ion-button>
          </div>
         <h2 class="rec-text-heading">Account</h2>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Naam</ion-label>              <ion-input v-model="name" @ionBlur="saveProfile('name', name)"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input v-model="email" type="email" @ionBlur="saveProfile('email', email)"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Gebruikersnaam</ion-label>
              <ion-input v-model="username" @ionBlur="saveProfile('username', username)"></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-button expand="block" color="danger" @click="handleLogout">
                Uitloggen
              </ion-button>
            </ion-item>
          </ion-list>        </div>
      </div>

      <div class="rec-card">
        <h2 class="rec-text-heading">Weergave</h2>        <ion-list>
          <ion-item>
            <ion-label>Donkere Modus</ion-label>
            <ion-toggle :checked="isDark" @ionChange="toggleDarkMode"></ion-toggle>
          </ion-item>
        </ion-list>
      </div>

      <div class="rec-card">
        <h2 class="rec-text-heading">Meldingen</h2>
        <ion-list>          <ion-item>
            <ion-label>Notificaties</ion-label>
            <ion-toggle :checked="settings.notifications" @ionChange="toggleSetting('notifications')"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Deadline Herinneringen</ion-label>
            <ion-toggle :checked="settings.deadlineReminders" @ionChange="toggleSetting('deadlineReminders')"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Geluid</ion-label>
            <ion-toggle :checked="settings.notificationSound" @ionChange="toggleSetting('notificationSound')"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Trillen</ion-label>
            <ion-toggle :checked="settings.vibration" @ionChange="toggleSetting('vibration')"></ion-toggle>
          </ion-item>        </ion-list>
      </div>

      <div class="rec-card">
        <h2 class="rec-text-heading">Privacy & Beveiliging</h2>
        <ion-list>          <ion-item>
            <ion-label>Locatie Toegang</ion-label>
            <ion-toggle :checked="settings.locationAccess" @ionChange="toggleSetting('locationAccess')"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Biometrische Vergrendeling</ion-label>
            <ion-toggle :checked="settings.biometricLock" @ionChange="toggleSetting('biometricLock')"></ion-toggle>
          </ion-item>
        </ion-list>
      </div>

     
      <div class="rec-card">
        <h2 class="rec-text-heading">Extra</h2>
        <ion-list>
          <ion-item button @click="checkForUpdates">
            <ion-label>Controleer op Updates</ion-label>
            <ion-icon :icon="refreshOutline" slot="end"></ion-icon>
          </ion-item>
          <ion-item button @click="showPrivacyPolicy">
            <ion-label>Privacybeleid</ion-label>
            <ion-icon :icon="documentTextOutline" slot="end"></ion-icon>
          </ion-item>
          <ion-item button @click="showTerms">
            <ion-label>Gebruiksvoorwaarden</ion-label>
            <ion-icon :icon="documentOutline" slot="end"></ion-icon>
          </ion-item>
          <ion-item>
            <ion-label>
              <h2>App Versie</h2>
              <p>1.0.0</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/vue';
import {
  cameraOutline,
  refreshOutline,
  documentTextOutline,
  documentOutline
} from 'ionicons/icons';
import { useDarkMode } from '@/composables/useDarkMode';
import { useSettings } from '@/composables/useSettings';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { isDark, toggleDarkMode } = useDarkMode();
const { settings, toggleSetting, checkForUpdates, showPrivacyPolicy, showTerms } = useSettings();
const { user, updateProfile, logout } = useAuth();

const name = ref(user?.value?.name || '');
const email = ref(user?.value?.email || '');
const username = ref(user?.value?.username || '');

const saveProfile = (field: string, value: string) => {
  updateProfile({ [field]: value });
};

const changeAvatar = () => {
  updateProfile({ avatar: '/assets/images/default-avatar.png' });
};

const handleLogout = async () => {
  await logout();
  router.push('/login');
};

onMounted(() => {
  if (user?.value) {
    name.value = user.value.name;
    email.value = user.value.email;
    username.value = user.value.username;
  }
});
</script>

<style scoped>
.rec-card {
  margin-bottom: var(--rec-spacing-3);
  background: var(--ion-card-background);
  border-radius: var(--rec-border-radius);
  padding: var(--rec-spacing-3);
}

.rec-text-heading {
  margin: 0 0 var(--rec-spacing-2);
  color: var(--ion-text-color);
}

.user-profile {
  padding: 1rem 0;
}

.avatar-section {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.change-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;  margin: 0;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 0.5rem;
}

ion-list { 
  background: transparent; 
}

ion-item:last-child {
  --border-width: 0;
  margin-bottom: 0;
}

ion-button[color="danger"] {
  margin-top: 1rem;
}

.header-image-container {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>