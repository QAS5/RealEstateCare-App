<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="login-wrapper">
        <div class="logo-section">
          <img src="/assets/images/logo.png" alt="RealEstateCare Logo" class="app-logo" />
        </div>
        
        <div class="form-container">
          <form @submit.prevent="handleLogin" v-if="!show2FA">
            <div class="input-group">
              <ion-item lines="none" class="login-input">
                <ion-label position="floating">E-mail adres</ion-label>
                <ion-input v-model="username" type="email" required></ion-input>
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

          <!-- 2FA Form -->
          <form @submit.prevent="handle2FA" v-if="show2FA">
            <div class="twofa-header">
              <h2>Twee-factor authenticatie</h2>
              <p>Voer de 6-cijferige verificatiecode in</p>
            </div>
            
            <div class="input-group">
              <ion-item lines="none" class="login-input">
                <ion-label position="floating">Verificatiecode</ion-label>
                <ion-input 
                  v-model="twoFACode" 
                  type="text" 
                  maxlength="6"
                  required></ion-input>
              </ion-item>
            </div>

            <ion-button 
              expand="block" 
              type="submit" 
              class="login-btn" 
              :disabled="isLoading">
              <span v-if="!isLoading">Verifiëren</span>
              <span v-else>Verifiëren...</span>
            </ion-button>

            <ion-button 
              expand="block" 
              fill="clear" 
              class="back-btn"
              @click="goBack">
              Terug naar inloggen
            </ion-button>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
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
const { login, verify2FA } = useAuth();

const username = ref('');
const password = ref('');
const twoFACode = ref('');
const isLoading = ref(false);
const show2FA = ref(false);

const displayMessage = async (text, type = 'danger') => {
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
  
  try {
    await login(username.value, password.value);
    displayMessage('Inloggegevens correct. Voer uw 2FA code in.', 'success');
    show2FA.value = true;
  } catch (err) {
    displayMessage(err.message || 'Inloggen mislukt. Controleer uw gegevens.');
  } finally {
    isLoading.value = false;
  }
};

const handle2FA = async () => {
  if (isLoading.value) return;
  
  if (!twoFACode.value.trim()) {
    displayMessage('Voer de 2FA code in', 'warning');
    return;
  }

  isLoading.value = true;
  
  try {
    await verify2FA(twoFACode.value);
    displayMessage('Succesvol ingelogd!', 'success');
    router.push('/home');
  } catch (err) {
    displayMessage(err.message || '2FA verificatie mislukt.');
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  show2FA.value = false;
  twoFACode.value = '';
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

.back-btn {
  margin-top: 1rem;
  --color: var(--ion-color-medium);
}

.twofa-header {
  text-align: center;
  margin-bottom: 2rem;
}

.twofa-header h2 {
  color: var(--ion-color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.twofa-header p {
  color: var(--ion-color-medium);
  font-size: 0.9rem;
  margin: 0;
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
