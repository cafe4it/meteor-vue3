<template>
  <h2>Learn Meteor!</h2>
  <p v-if="currentUser">
    username: <span>{{currentUser.username}}</span> <button>Logout</button>
  </p>
  <ul>
    <li>
      <form @submit.prevent="submit($event.target)">
        <input type="text" name="title" placeholder="Title" required>
        <input type="url" name="url" placeholder="Url" required>
        <input type="submit" name="submit" value="Add new link">
      </form>
    </li>

    <div v-if="!ready">Loading...</div>

    <li v-for="link of links" :key="link._id">
      <a :href="link.url" target="_blank">{{ link.title }}</a>
      &nbsp;
      <button @click="deleteLink(link._id)">x</button>
    </li>
  </ul>
</template>

<script setup>
import Links from '../../api/collections/Links'
import { subscribe, autoResult } from 'meteor/vuejs:vue3'
import { useStore } from "../stores/main";
import { storeToRefs } from 'pinia'
const store = useStore()
const {currentUser} = storeToRefs(store)
const { ready } = subscribe('links')
// const { ready } = autoSubscribe(() => ['links.all'])

const links = autoResult(() => Links.find({}))

function submit (form) {
  const title = form.title
  const url = form.url

  Meteor.call('createLink', title.value, url.value, (error) => {
    if (error) {
      alert(error.error)
    } else {
      title.value = ''
      url.value = ''
    }
  })
}

function deleteLink(id){
  if(id){
    Meteor.call('deleteLink', id, function (err) {
      if(err){
        alert(err.error)
      }
    })
  }
}
</script>

<style scoped>
  ul {
    font-family: monospace;
  }
</style>
