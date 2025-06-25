<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title class="rec-text-heading">Uitgevoerde Inspecties</ion-title>
      </ion-toolbar>
    </ion-header>    <ion-content :fullscreen="true" class="ion-padding">
      
      <div v-if="inspectionStore.isLoading" class="loading-container">
        <ion-spinner></ion-spinner>
        <p>Laden van inspecties...</p>
      </div>

      <div class="rec-card" v-else-if="!currentInspection">
        <div class="list-header">
          <h2 class="rec-text-heading">Uitgevoerde Inspecties</h2>
          <ion-searchbar 
            class="rec-input search-bar"
            placeholder="Zoek inspecties.."
            v-model="searchQuery">
          </ion-searchbar>        </div>        
        <ion-list>
          <ion-item v-for="(inspection, index) in filteredInspections" 
                    :key="inspection.id" 
                    class="inspection-row"
                    button
                    @click="showInspection(inspection)">
            <ion-label>
              <h3 class="rec-text-heading">{{ inspection.address }}</h3>
              <p class="rec-text-body">{{ inspection.type }}</p>
              <p class="rec-text-body">Uitgevoerd op: {{ formatDate(inspection.completedAt) }}</p>
            </ion-label>
            <ion-icon :icon="create" slot="end"></ion-icon>
          </ion-item>          
          <ion-item v-if="filteredInspections.length === 0" class="no-results">
            <ion-label>
              <p class="rec-text-body">Geen uitgevoerde inspecties gevonden.</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>      <div class="inspection-form" v-if="currentInspection && formData">
        <div class="form-header">
          <h2>{{ currentInspection.address }}</h2>
          <p>{{ currentInspection.type }} - Uitgevoerd op: {{ formatDate(currentInspection.completedAt) }}</p>
        </div>        <ion-list>
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Schade opnemen</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.damage.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Nieuwe schade</ion-label>
              <ion-radio-group v-model="formData.damage.isNew">
                <ion-item lines="none">
                  <ion-label>Ja</ion-label>
                  <ion-radio slot="start" value="yes"></ion-radio>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>Nee</ion-label>
                  <ion-radio slot="start" value="no"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label>Soort schade</ion-label>
              <ion-select v-model="formData.damage.type" interface="popover">
                <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                <ion-select-option value="slijtage">Slijtage</ion-select-option>
                <ion-select-option value="geweld">Geweld</ion-select-option>
                <ion-select-option value="normaal_gebruik">Normaal gebruik</ion-select-option>
                <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                <ion-select-option value="anders">Anders</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Datum</ion-label>
              <ion-datetime v-model="formData.damage.date" presentation="date"></ion-datetime>
            </ion-item>

            <ion-item>
              <ion-label>Actie vereist</ion-label>
              <ion-radio-group v-model="formData.damage.requiresAction">
                <ion-item lines="none">
                  <ion-label>Ja</ion-label>
                  <ion-radio slot="start" value="yes"></ion-radio>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>Nee</ion-label>
                  <ion-radio slot="start" value="no"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Omschrijving</ion-label>
              <ion-textarea 
                v-model="formData.damage.description" 
                placeholder="Beschrijf de schade..."
                :rows="4">
              </ion-textarea>
            </ion-item>            <ion-item>
              <div class="photos-container">
                <template v-for="(photo, photoIndex) in formData.damage.photos" :key="photoIndex">
                  <div v-if="photo.startsWith('Bijlage')" class="photo-placeholder">
                    {{ photo }}
                  </div>
                  <ion-thumbnail v-else class="photo-thumbnail">
                    <ion-img :src="photo"></ion-img>
                  </ion-thumbnail>
                </template>
              </div>
            </ion-item>
          </ion-item-group>

         
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Achterstallig onderhoud</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.maintenance.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Soort onderhoud</ion-label>
              <ion-select v-model="formData.maintenance.type" interface="popover">
                <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                <ion-select-option value="houtrot">Houtrot</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                <ion-select-option value="beglazing">Beglazing</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Kostenindicatie</ion-label>
              <ion-select v-model="formData.maintenance.costIndication" interface="popover">
                <ion-select-option value="0-500">€0 - €500</ion-select-option>
                <ion-select-option value="500-1500">€500 - €1.500</ion-select-option>
                <ion-select-option value="1500+">€1.500+</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Actie vereist</ion-label>
              <ion-radio-group v-model="formData.maintenance.requiresAction">
                <ion-item lines="none">
                  <ion-label>Ja</ion-label>
                  <ion-radio slot="start" value="yes"></ion-radio>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>Nee</ion-label>
                  <ion-radio slot="start" value="no"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <div class="photos-container">
                <ion-thumbnail v-for="(photo, photoIndex) in formData.maintenance.photos" 
                              :key="photoIndex" 
                              class="photo-thumbnail">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>
          </ion-item-group>          
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Technische Installaties</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.technical.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Type installatie</ion-label>
              <ion-select v-model="formData.technical.type" interface="popover">
                <ion-select-option value="verwarming">Verwarming</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="water">Water</ion-select-option>
                <ion-select-option value="ventilatie">Ventilatie</ion-select-option>
                <ion-select-option value="anders">Anders</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Gemelde Problemen</ion-label>
              <ion-textarea 
                v-model="formData.technical.reported_issues" 
                placeholder="Beschrijf de gemelde problemen..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <ion-label>Goedgekeurd</ion-label>
              <ion-radio-group v-model="formData.technical.approved">
                <ion-item lines="none">
                  <ion-label>Ja</ion-label>
                  <ion-radio slot="start" value="yes"></ion-radio>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>Nee</ion-label>
                  <ion-radio slot="start" value="no"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Opmerkingen</ion-label>
              <ion-textarea 
                v-model="formData.technical.notes" 
                placeholder="Voeg opmerkingen toe..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <div class="photos-container">
                <ion-thumbnail v-for="(photo, photoIndex) in formData.technical.photos" 
                              :key="photoIndex" 
                              class="photo-thumbnail">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>
          </ion-item-group>          
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Modificaties</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.modifications.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Uitgevoerd door</ion-label>
              <ion-select v-model="formData.modifications.executedBy" interface="popover">
                <ion-select-option value="huurder">Huurder</ion-select-option>
                <ion-select-option value="aannemer">Aannemer</ion-select-option>
                <ion-select-option value="onbekend">Onbekend</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Omschrijving</ion-label>
              <ion-textarea 
                v-model="formData.modifications.description" 
                placeholder="Beschrijf de modificatie..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <ion-label>Actie</ion-label>
              <ion-select v-model="formData.modifications.action" interface="popover">
                <ion-select-option value="keuren">Keuren</ion-select-option>
                <ion-select-option value="afkeuren">Afkeuren</ion-select-option>
                <ion-select-option value="aanpassen">Aanpassen vereist</ion-select-option>
                <ion-select-option value="verwijderen">Verwijderen vereist</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Opmerkingen</ion-label>
              <ion-textarea 
                v-model="formData.modifications.notes" 
                placeholder="Voeg opmerkingen toe..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <div class="photos-container">
                <ion-thumbnail v-for="(photo, photoIndex) in formData.modifications.photos" 
                              :key="photoIndex" 
                              class="photo-thumbnail">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>          </ion-item-group>

          <div class="form-actions">
            <ion-button expand="block" @click="updateInspection" color="primary">
              Wijzigingen opslaan
            </ion-button>
            <ion-button expand="block" @click="cancelInspection" fill="outline">
              Annuleren
            </ion-button>
          </div>
        </ion-list>
      </div>
    </ion-content>
    
    <AppFooter />
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonList,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonThumbnail,
  IonImg,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonDatetime,
  IonSpinner,
  toastController
} from '@ionic/vue';
import { create } from 'ionicons/icons';
import { InspectionStatus } from '@/types/inspection.js';
import { useInspectionStore } from '@/stores/inspectionStore.js';
import AppFooter from '@/components/AppFooter.vue';

const searchQuery = ref('');
const currentInspection = ref(null);

const inspectionStore = useInspectionStore();

const formData = ref(null);

onMounted(async () => {  try {
    await inspectionStore.loadCompletedInspections();
  } catch (error) {

  }
});

const filteredInspections = computed(() => {
  if (!searchQuery.value) return inspectionStore.completedInspections;
  return inspectionStore.completedInspections.filter(inspection => 
    inspection.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    inspection.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const showInspection = (inspection) => {
  currentInspection.value = inspection;
  if (inspection.formData) {
    formData.value = JSON.parse(JSON.stringify(inspection.formData));
  } else {
    formData.value = {
      damage: {
        location: '',
        isNew: 'no',
        type: '',
        date: new Date().toISOString(),
        requiresAction: 'no',
        description: '',
        photos: []
      },
      maintenance: {
        location: '',
        type: '',
        requiresAction: 'no',
        costIndication: '',
        photos: []
      },
      technical: {
        location: '',
        type: '',
        reported_issues: '',
        approved: 'no',
        notes: '',
        photos: []
      },
      modifications: {
        location: '',
        executedBy: '',
        description: '',
        action: '',
        notes: '',
        photos: []      }
    };
  }
};

const updateInspection = async () => {
  try {    
    if (currentInspection.value && formData.value) {
      const updatedInspection = {
        ...currentInspection.value,
        formData: formData.value
      };
      
      await inspectionStore.updateInspection(updatedInspection);
    }

    const toast = await toastController.create({
      message: 'Wijzigingen opgeslagen',
      duration: 2000,
      color: 'success'
    });
    await toast.present();    currentInspection.value = null;
    formData.value = null;
  } catch (error) {
    const toast = await toastController.create({
      message: 'Fout bij het opslaan',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
};

const cancelInspection = () => {
  currentInspection.value = null;
  formData.value = null;
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.loading-container p {
  margin-top: 1rem;
  color: var(--ion-color-medium);
}

.list-header {
  margin-bottom: var(--rec-spacing-4);
}

.list-header h2 {
  margin-bottom: var(--rec-spacing-3);
}

.search-bar {
  margin-bottom: var(--rec-spacing-2);
}

.inspection-row {
  margin-bottom: var(--rec-spacing-2);
  border-radius: var(--rec-radius);
}

.form-header {
  padding: 1rem;
  background: var(--ion-color-light);
  border-radius: var(--rec-radius);
  margin-bottom: 1rem;
}

.form-header h2 {
  margin: 0;
  color: var(--ion-color-dark);
}

.form-header p {
  margin: 0.5rem 0 0 0;
  color: var(--ion-color-medium);
}

ion-item-divider {
  margin-top: 1rem;
  --background: var(--ion-color-light);
  --color: var(--ion-color-dark);
}

.form-actions {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

ion-textarea {
  min-height: 100px;
}

.photos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
}

.photo-thumbnail {
  width: 80px;
  height: 80px;
  margin: 0;
  border: 2px solid rgba(0, 170, 162, 1);
  border-radius: 8px;
  overflow: hidden;
}

.photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--ion-color-light);
  border: 1px dashed var(--ion-color-medium);
  border-radius: 8px;
  color: var(--ion-color-medium);
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
}

@media (max-width: 576px) {
  .photo-thumbnail {
    width: 60px;
    height: 60px;
  }
  
  .photo-placeholder {
    width: 60px;
    height: 60px;
    font-size: 0.7rem;
  }
}
</style>