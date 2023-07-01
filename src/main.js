import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia/dist/pinia";

createApp(App).use(createPinia()).mount('#app')
