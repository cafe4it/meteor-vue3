import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import '../imports/startup/both'
// import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  Meteor.startup(() => {
    const app = createApp(App)
    app.use(createPinia())
    app.mount('#app')
  })
})
