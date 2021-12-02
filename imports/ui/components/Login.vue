<template>
<div>
  <form @submit.prevent="submit($event.target)">
  <input name="username" placeholder="username" required/>
  <input name="password" type="password" placeholder="password" required/>
  <button type="submit">Login</button>
  </form>
</div>
</template>

<script setup>
import { Meteor } from "meteor/meteor";

function submit(form){
  const username = form.username.value
  const password = form.password.value
  Meteor.loginWithPassword(username, password)
}

</script>
