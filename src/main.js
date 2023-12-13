import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL

//Vue.prototype.$http = axios;
//createApp(App).use(store).use(router, axios).mount('#app')
const app = createApp(App).use(store).use(router, axios);
app.config.globalProperties.$http = () => {}

router.isReady().then(() => {
    app.mount('#app');
  });
