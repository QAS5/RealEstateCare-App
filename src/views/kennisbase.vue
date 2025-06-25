<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title class="rec-text-heading">Kennisbase</ion-title>
      </ion-toolbar>
    </ion-header>    <ion-content :fullscreen="true" class="ion-padding">
      <div class="header-image-container">
        <img src="/assets/images/header.png" alt="Kennisbase Header" class="header-image" />
      </div><div class="rec-card">
        <div class="kb-header">
          <h2 class="rec-text-heading">Kennisbase</h2>
          <ion-searchbar 
            class="rec-input search-bar"
            placeholder="Zoek in documenten..."
            v-model="searchQuery">
          </ion-searchbar>        </div>

        <ion-item-group>
          <ion-item-divider>
            <ion-label>Inspectie Documentatie</ion-label>
          </ion-item-divider>

          <ion-item v-for="doc in filteredDocuments" :key="doc.id" button @click="viewDocument(doc)">
            <ion-icon :icon="document" slot="start" color="primary"></ion-icon>
            <ion-label>
              <h3>{{ doc.title }}</h3>
              <p>{{ doc.description }}</p>
            </ion-label>
          </ion-item>
        </ion-item-group>
      </div>
    </ion-content>
    
    <AppFooter />
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  toastController
} from '@ionic/vue';
import { document, documentText, book, library } from 'ionicons/icons';
import AppFooter from '@/components/AppFooter.vue';

const searchQuery = ref('');

const docsList = ref([
  {
    id: 1,
    title: 'Testprocedure Technische Installaties',
    description: 'Standaard testprocedures voor technische installaties',
    category: 'procedures',
    fileName: 'testprocedure.pdf'
  },
  {
    id: 2,
    title: 'Handleiding Inspectie App',
    description: 'Gebruikershandleiding voor de RealEstateCare inspectie applicatie',
    category: 'procedures',
    fileName: 'handleiding.pdf'
  },
  {
    id: 3,
    title: 'Bouwkundige Referentiedetails',
    description: 'Standaard details voor bouwkundige inspecties',
    category: 'procedures',
    fileName: 'referentiedetails.pdf'
  },
  {
    id: 4,
    title: 'Testprocedure Modificaties',
    description: 'Procedures voor het keuren van aangebrachte modificaties',
    category: 'procedures',
    fileName: 'modificaties.pdf'
  }
]);

const filteredDocuments = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return docsList.value.filter(doc => 
    !query || 
    doc.title.toLowerCase().includes(query) || 
    doc.description.toLowerCase().includes(query)
  );
});

const viewDocument = async (doc) => {
  try {
    window.open(`/assets/docs/${doc.fileName}`, '_blank');
  } catch (error) {
    const toast = await toastController.create({
      message: 'Fout bij het openen van het document',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
};
</script>

<style scoped>
.rec-card {
  margin-bottom: var(--rec-spacing-3);
}

.kb-header {
  margin-bottom: var(--rec-spacing-4);
}

.kb-header h2 {
  margin-bottom: var(--rec-spacing-3);
}

ion-item-divider {
  margin-top: var(--rec-spacing-4);
  --background: var(--ion-color-light);
  --color: var(--ion-color-dark);
}

ion-item {
  --padding-start: 0;
  margin-bottom: var(--rec-spacing-2);
}

ion-icon { margin-right: var(--rec-spacing-2); }

ion-badge {
  margin-left: var(--rec-spacing-2);
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