import '@unocss/reset/normalize.css'
import '@/assets/styles/main.css'
import './permission.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import 'animate.css'
import TDesign from 'tdesign-mobile-vue'
import 'tdesign-mobile-vue/es/style/index.css'

import VConsole from 'vconsole'
let vConsole = undefined
// vConsole = new VConsole()
if (import.meta.env.DEV) {
  vConsole = new VConsole()
} else vConsole?.destroy()


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(TDesign)

app.mount('#app')
