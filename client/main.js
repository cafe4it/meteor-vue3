import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'

// import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  Meteor.startup(() => {
    const app = createApp(App)
    app.mount('#app')
  })
})
