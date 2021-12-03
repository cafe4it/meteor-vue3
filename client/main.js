import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import { abilitiesPlugin } from '@casl/vue'
import { useStore } from "../imports/ui/stores/main";
import '../imports/startup/both'
// import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  Meteor.startup(() => {
    const app = createApp(App)
    app.use(createPinia())
    const mainStore = useStore()
    app.use(abilitiesPlugin, mainStore.$state.ability, {
      useGlobalProperties: true
    })
    app.mount('#app')
  })
})
