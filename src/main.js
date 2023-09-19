import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes.js'
import { createRouter,createWebHistory } from 'vue-router'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import {BootstrapVue} from 'bootstrap-vue'
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
const app = createApp(App)
import {
    BFormSelect
    }from 'bootstrap-vue-3'

[BFormSelect].forEach((x)=>app.use(x));
axios.defaults.withCredentials=true;

const router = createRouter({
    routes,
    history: createWebHistory()
})

app.use(router)
app.config.globalProperties.$axios = axios
app.use(BootstrapVue3)
app.mount('#app')
