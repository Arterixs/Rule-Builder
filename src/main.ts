import { createApp } from 'vue'
import draggable from 'vuedraggable';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import Aura from '@primeuix/themes/aura';
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ConfirmationService);
app.use(DialogService);
app.component('Draggable', draggable)
app.mount('#app')
