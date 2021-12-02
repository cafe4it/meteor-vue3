<template>
  <div>
    <h1>Welcome to Meteor!</h1>
    <hello/>
    <info v-if="store.currentUser"/>
    <login v-if="!store.currentUser"/>
  </div>
</template>

<script>
import { Meteor} from "meteor/meteor";
import Hello from './components/Hello.vue'
import Info from './components/Info.vue'
import Login from './components/Login'
import { autoResult } from 'meteor/vuejs:vue3'
import { useStore } from "./stores/main";
import { onMounted } from "vue";

export default {
  components: {
    Hello,
    Info,
    Login
  },
  setup(){
    const store = useStore()
    autoResult(async() => await store.setCurrentUser(Meteor.user()))
    return {
      store
    }
  }
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
