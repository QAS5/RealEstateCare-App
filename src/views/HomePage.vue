<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">
        <div class="logo-container">
          <img src="/assets/images/logo.png" alt="REC Logo" class="header-logo" />
        </div>
      </ion-toolbar>
    </ion-header>    <ion-content :fullscreen="true" class="ion-no-padding">
      <main>
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
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  height: calc(100vh - 80px); 
  width: 100%;
  box-sizing: border-box;
  margin-top: calc(5vh + 10px);
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
  height: 280px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
}

.card-content h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #121212;
  font-weight: bold;
}
.card-content p {
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .main-grid {
    gap: 8px;
    padding: 8px;
  }
}
</style>
