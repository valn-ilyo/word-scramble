import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'
import { createVuetify } from 'vuetify'
import { MotionPlugin } from '@vueuse/motion'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPersistedState)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0A0A0F',
          surface: '#12121A',
          primary: '#00E5FF',
          secondary: '#FFD600',
          accent: '#FF6D00',
          error: '#FF1744',
          success: '#76FF03',
          warning: '#FFD600',
        },
      },
      light: {
        dark: false,
        colors: {
          background: '#f8f8f8',
          surface: '#ffffff',
          primary: '#0077cc',
          secondary: '#cc7700',
          accent: '#cc0055',
          error: '#cc0000',
          success: '#2e7d32',
          warning: '#cc7700',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(MotionPlugin)
app.mount('#app')
