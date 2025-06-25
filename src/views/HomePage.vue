<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">
        <div class="logo-container">
          <img src="/assets/images/logo.png" alt="REC Logo" class="header-logo" />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-no-padding">
      <main>
        <div class="welcome-section">
          <h1>Welkom bij RealEstateCare</h1>
          <p>Kies een optie om te beginnen</p>
        </div>
        
        <div class="main-grid">
          <div class="nav-card" @click="goToToegewezen()">
            <img alt="Toegewezen Inspecties" src="/assets/images/toegewezen.jpg" />
            <div class="card-content">
              <h2>Toegewezen rapportages</h2>
              <p>Beheer uw openstaande rapportages</p>
            </div>
          </div>

          <div class="nav-card" @click="goToUitgevoerde()">
            <img alt="Uitgevoerde Inspecties" src="/assets/images/uitgevoerde.jpg" />
            <div class="card-content">
              <h2>Uitgevoerde rapportages</h2>
              <p>Overzicht van afgeronde rapportages</p>
            </div>
          </div>

          <div class="nav-card" @click="goToKennisbase()">
            <img alt="Kennisbase" src="/assets/images/kennisbase.jpg" />
            <div class="card-content">
              <h2>Kennisbase</h2>
              <p>Informatie en richtlijnen</p>
            </div>
          </div>

          <div class="nav-card" @click="goToInstellingen()">
            <img alt="Instellingen" src="/assets/images/instellingen.jpg" />
            <div class="card-content">
              <h2>Instellingen</h2>
              <p>Persoonlijke voorkeuren</p>
            </div>
          </div>
        </div>
      </main>
    </ion-content>
    
    <AppFooter />
  </ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';

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
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
}

.header-logo {
  height: 40px;
  margin: 0;
}

.welcome-section {
  text-align: center;
  padding: 80px 16px 0px 16px;
  margin-bottom: 0px;
}

.welcome-section h1 {
  color: #00aaa2;
  margin-bottom: 8px;
  font-size: 1.5rem;
  font-weight: 700;
}

.welcome-section p {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  height: calc(70vh - 60px); 
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.nav-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(0, 170, 162, 1);
  transition: transform 0.3s ease;
  height: 100%;
}

.nav-card:hover {
  transform: translateY(-4px);
}

.nav-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 12px;
  background: rgba(255, 255, 255, 0.9);
}

.card-content h2 {
  margin: 0;
  font-size: 1rem;
  color: #121212;
  font-weight: bold;
}

.card-content p {
  margin: 6px 0 0;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .main-grid {
    gap: 12px;
    padding: 15px;
    height: calc(60vh - 50px);
  }
  
  .nav-card img {
    height: 140px;
  }
  
  .card-content {
    padding: 10px;
  }
  
  .card-content h2 {
    font-size: 0.9rem;
  }
  
  .card-content p {
    font-size: 0.75rem;
  }
}
</style>
