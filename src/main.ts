import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style'
import router from "./router"
import { Checkbox } from 'vant';
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(Checkbox)
app.use(pinia)
app.mount('#app')
