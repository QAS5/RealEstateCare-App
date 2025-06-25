
<template>  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="rec-primary">        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title class="rec-text-heading">Toegewezen rapportages</ion-title>
      </ion-toolbar>
    </ion-header>    <ion-content :fullscreen="true" class="ion-padding">
      <div class="rec-card" v-if="!currentInspection">
        <div class="header-section">
          <h2 class="rec-text-heading">Openstaande rapportages</h2>
          <ion-searchbar 
            class="rec-input search-bar"
            placeholder="Zoek inspecties.."
            v-model="searchQuery">
          </ion-searchbar>
        </div>
        
        <ion-list>
          <ion-item v-for="inspection in filteredInspections" 
                    :key="inspection.id" 
                    class="inspection-row"
                    button
                    @click="openInspection(inspection)">
            <ion-label>
              <h3 class="rec-text-heading">{{ inspection.address }}</h3>
              <p class="rec-text-body">{{ inspection.type }}</p>
              <p class="rec-text-body">Deadline: {{ inspection.deadline }}</p>
            </ion-label>
            <ion-badge class="rec-badge" :class="getStatusClass(inspection.status)">
              {{ inspection.status }}
            </ion-badge>            <ion-icon :icon="arrowForward"></ion-icon>
          </ion-item>
        </ion-list>      </div>

      <div class="inspection-form" v-if="currentInspection">
        <div class="form-header">
          <h2>{{ currentInspection.address }}</h2>
          <p>{{ currentInspection.type }} - {{ currentInspection.deadline }}</p>
        </div>
          <ion-list>
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
              <ion-label>Acute actie vereist</ion-label>
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
            </ion-item>

            <ion-item>
              <ion-button @click="takePicture('damage')">
                <ion-icon :icon="camera" slot="start"></ion-icon>
                Foto toevoegen
              </ion-button>
              <div class="photo-display">
                <ion-thumbnail v-for="(photo, index) in formData.damage.photos" 
                           :key="index">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>
          </ion-item-group>          <ion-item-group>
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
              <ion-label>Acute actie vereist</ion-label>
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
              <ion-label>Kostenindicatie</ion-label>
              <ion-select v-model="formData.maintenance.costIndication" interface="popover">
                <ion-select-option value="0-500">€0 - €500</ion-select-option>
                <ion-select-option value="500-1500">€500 - €1.500</ion-select-option>
                <ion-select-option value="1500+">€1.500+</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-button @click="takePicture('maintenance')">
                <ion-icon :icon="camera" slot="start"></ion-icon>
                Foto toevoegen
              </ion-button>
              <div class="photo-display">
                <ion-thumbnail v-for="(photo, index) in formData.maintenance.photos" 
                           :key="index">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>
          </ion-item-group>          <ion-item-group>
            <ion-item-divider>
              <ion-label>Technische Installaties</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.technical.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Soort installatie</ion-label>
              <ion-select v-model="formData.technical.type" interface="popover">
                <ion-select-option value="koeling">Koeling</ion-select-option>
                <ion-select-option value="verwarming">Verwarming</ion-select-option>
                <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Gemelde storingen</ion-label>
              <ion-textarea 
                v-model="formData.technical.reported_issues" 
                placeholder="Beschrijf de gemelde storingen..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <ion-label>Testprocedure</ion-label>
              <ion-button fill="clear" size="small" @click="openTestProcedure">
                <ion-icon :icon="document" slot="start"></ion-icon>
                Open PDF
              </ion-button>
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
              <ion-button @click="takePicture('technical')">
                <ion-icon :icon="camera" slot="start"></ion-icon>
                Foto toevoegen
              </ion-button>
              <div class="photo-display">
                <ion-thumbnail v-for="(photo, index) in formData.technical.photos" 
                           :key="index">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>
          </ion-item-group>          <ion-item-group>
            <ion-item-divider>
              <ion-label>Modificaties</ion-label>
            </ion-item-divider>

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="formData.modifications.location" placeholder="Voer locatie in"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Uitgevoerd door</ion-label>
              <ion-input v-model="formData.modifications.executedBy" placeholder="Naam uitvoerder"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Omschrijving</ion-label>
              <ion-textarea 
                v-model="formData.modifications.description" 
                placeholder="Beschrijf de modificaties..."
                :rows="4">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <ion-label>Actie</ion-label>
              <ion-select v-model="formData.modifications.action" interface="popover">
                <ion-select-option value="approved">Goedgekeurd</ion-select-option>
                <ion-select-option value="rejected">Afgekeurd</ion-select-option>
                <ion-select-option value="review">Nader onderzoek nodig</ion-select-option>
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
              <ion-button @click="takePicture('modifications')">
                <ion-icon :icon="camera" slot="start"></ion-icon>
                Foto toevoegen
              </ion-button>
              <div class="photo-display">
                <ion-thumbnail v-for="(photo, index) in formData.modifications.photos" 
                           :key="index">
                  <ion-img :src="photo"></ion-img>
                </ion-thumbnail>
              </div>
            </ion-item>          </ion-item-group>

          <div class="form-actions">
            <ion-button expand="block" @click="saveInspection" color="primary">
              Opslaan
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
  IonBadge,
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
  toastController
} from '@ionic/vue';
import { arrowForward, camera, document } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import AppFooter from '@/components/AppFooter.vue';
import { InspectionStatus } from '@/types/inspection.js';
import { useInspectionStore } from '@/stores/inspectionStore.js';

const searchQuery = ref('');
const currentInspection = ref(null);

const inspectionStore = useInspectionStore();
onMounted(async () => {
  localStorage.removeItem('realestatecare_assigned_inspections');
  await inspectionStore.loadAssignedInspections();
});

const formData = ref({
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
    photos: []
  }
});

const filteredInspections = computed(() => {
  if (!searchQuery.value) return inspectionStore.assignedInspections;
  return inspectionStore.assignedInspections.filter(inspection => 
    inspection.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    inspection.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'urgent':
      return 'rec-badge-error';
    case 'gepland':
      return 'rec-badge-info';
    default:
      return 'rec-badge-secondary';
  }
};

const openInspection = (inspection) => {
  currentInspection.value = inspection;
};

const takePicture = async (section) => {
  try {    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    if (image.dataUrl) {
      formData.value[section].photos.push(image.dataUrl);
    }
    
    const toast = await toastController.create({
      message: 'Foto toegevoegd',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  } catch (error) {
    const toast = await toastController.create({
      message: 'Fout bij het maken van de foto',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
};

const resetFormData = () => {
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
      photos: []
    }
  };
};

const saveInspection = async () => {
  if (!currentInspection.value) {
    return;
  }
  try {
    const updatedInspection = {
      ...currentInspection.value,
      formData: { ...formData.value },
      status: InspectionStatus.COMPLETED,
      completedAt: new Date().toISOString()
    };

    await inspectionStore.updateInspection(updatedInspection);

    const toast = await toastController.create({
      message: 'Inspectie succesvol opgeslagen en afgerond',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    currentInspection.value = null;
    resetFormData();
    
    await inspectionStore.loadAssignedInspections();
  } catch (error) {
    const toast = await toastController.create({
      message: 'Fout bij het opslaan van de inspectie',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
};

const cancelInspection = () => {
  currentInspection.value = null;
  resetFormData();
};

const openTestProcedure = () => {
  window.open('/assets/testprocedure.pdf', '_blank');
};
</script>

<style scoped>
.header-section {
  margin-bottom: var(--rec-spacing-4);
}

.header-section h2 {
  margin-bottom: var(--rec-spacing-3);
}

.search-bar {
  margin-bottom: var(--rec-spacing-2);
}

.inspection-row {
  margin-bottom: var(--rec-spacing-2);
  border-radius: var(--rec-radius);
}

ion-badge {
  margin-right: var(--rec-spacing-2);
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

ion-thumbnail {
  margin-left: 1rem;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(0, 170, 162, 1);
  border-radius: 8px;
  overflow: hidden;
}

.photo-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.form-actions {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

ion-textarea { min-height: 100px; }

ion-datetime {
  --ion-background-color: var(--ion-color-light) !important;
  --ion-text-color: var(--ion-color-dark) !important;
  --ion-color-base: var(--ion-color-light) !important;
  --ion-color-contrast: var(--ion-color-dark) !important;
  --highlight-color: var(--ion-color-primary);
  border-radius: 8px;
  margin: 8px 0;
}

@media (max-width: 576px) {
  .form-actions {
    padding: 0.75rem;
  }
  
  ion-thumbnail {
    width: 40px;
    height: 40px;
  }
}
</style>