// app/frontend/entrypoints/application.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '../router'
import App from '../components/App.vue'
import '../styles/application.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')