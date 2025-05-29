import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { IonicVue } from '@ionic/vue'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import '@ionic/vue/css/palettes/dark.class.css'

import './theme/custom.css'

const darkMode = localStorage.getItem('darkMode')
if (darkMode === 'true') {
  document.body.classList.add('dark')
}

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia());

router.isReady().then(() => {
  app.mount('#app');
});
