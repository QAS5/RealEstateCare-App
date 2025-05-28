<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="login-wrapper">
        <div class="logo-section">
          <img src="/assets/images/logo.png" alt="RealEstateCare Logo" class="app-logo" />
        </div>
        
        <div class="form-container">
          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <ion-item lines="none" class="login-input">
                <ion-label position="floating">Gebruikersnaam</ion-label>
                <ion-input v-model="username" type="text" required></ion-input>
              </ion-item>
            </div>

            <div class="input-group">
              <ion-item lines="none" class="login-input">
                <ion-label position="floating">Wachtwoord</ion-label>
                <ion-input v-model="password" type="password" required></ion-input>
              </ion-item>
            </div>

            <ion-button 
              expand="block" 
              type="submit" 
              class="login-btn" 
              :disabled="isLoading">
              <span v-if="!isLoading">Inloggen</span>
              <span v-else>Aanmelden...</span>
            </ion-button>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  toastController
} from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { login } = useAuth();

const username = ref('');
const password = ref('');
const isLoading = ref(false);

const displayMessage = async (text: string, type: string = 'danger') => {
  const toast = await toastController.create({
    message: text,
    duration: 2500,
    color: type,
    position: 'top'
  });
  await toast.present();
};

const handleLogin = async () => {
  if (isLoading.value) return;
  
  if (!username.value.trim() || !password.value.trim()) {
    displayMessage('Voer uw gegevens in', 'warning');
    return;
  }

  isLoading.value = true;
  
  try {    await login(username.value, password.value);
    router.push('/home');
  } catch (err) {
    displayMessage('Inloggen mislukt. Controleer uw gegevens.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 380px;
  margin: 0 auto;
  padding: 1.5rem;
}

.logo-section {
  text-align: center;
  margin-bottom: 3rem;
}

.app-logo {
  width: 180px;
  height: auto;
}

.form-container {
  width: 100%;
}

.input-group {
  margin-bottom: 1.2rem;
}

.login-input {
  --background: #f8f9fa;
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.login-input.item-has-focus {
  --border-color: var(--ion-color-primary);
}

.login-btn {
  margin-top: 2rem;
  --border-radius: 8px;
  height: 48px;
  font-weight: 500;
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 1rem;
  }
  
  .app-logo {
    width: 160px;
  }
}
</style>
