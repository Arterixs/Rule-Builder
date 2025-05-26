import { createApp } from 'vue'
import './assets/main.css'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import draggable from 'vuedraggable';
import Aura from '@primeuix/themes/aura';
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ConfirmationService);
app.component('Draggable', draggable)
app.mount('#app')
