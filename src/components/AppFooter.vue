<template>
  <ion-footer class="app-footer">
    <ion-toolbar color="rec-primary">
      <div class="footer-content">
        <div class="footer-nav-item" @click="goToToegewezen()">
          <ion-icon :icon="documentTextOutline" class="footer-icon"></ion-icon>
          <span class="footer-label">Toegewezen</span>
        </div>
        
        <div class="footer-nav-item" @click="goToUitgevoerde()">
          <ion-icon :icon="checkboxOutline" class="footer-icon"></ion-icon>
          <span class="footer-label">Uitgevoerde</span>
        </div>
        
        <div class="footer-nav-item" @click="goToKennisbase()">
          <ion-icon :icon="libraryOutline" class="footer-icon"></ion-icon>
          <span class="footer-label">Kennisbase</span>
        </div>
        
        <div class="footer-nav-item" @click="goToInstellingen()">
          <ion-icon :icon="settingsOutline" class="footer-icon"></ion-icon>
          <span class="footer-label">Instellingen</span>
        </div>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar, IonIcon } from '@ionic/vue';
import { documentTextOutline, checkboxOutline, libraryOutline, settingsOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToToegewezen() {
  router.push('/toegewezen');
}

function goToUitgevoerde() {
  router.push('/uitgevoerde');
}

function goToKennisbase() {
  router.push('/kennisbase');
}

function goToInstellingen() {
  router.push('/instellingen');
}
</script>

<style scoped>
.app-footer {
  --background: var(--ion-color-rec-primary);
  --color: white;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
}

.footer-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px 4px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-height: 50px;
}

.footer-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.footer-nav-item:active {
  transform: translateY(0);
  background-color: rgba(255, 255, 255, 0.2);
}

.footer-icon {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 4px;
}

.footer-label {
  font-size: 0.7rem;
  color: white;
  text-align: center;
  font-weight: 500;
  line-height: 1.2;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .footer-content {
    padding: 6px 8px;
    gap: 4px;
  }
  
  .footer-nav-item {
    padding: 6px 2px;
    min-height: 45px;
  }
  
  .footer-icon {
    font-size: 1rem;
  }
  
  .footer-label {
    font-size: 0.65rem;
  }
}

@media (max-width: 360px) {
  .footer-label {
    font-size: 0.6rem;
  }
  
  .footer-icon {
    font-size: 0.9rem;
  }
}
</style>
