<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'register' }">Register</router-link>
      <router-link :to="{ name: 'profile' }">Profile</router-link>
      <router-link :to="{ name: 'transfert' }">Transfert</router-link>
      <router-link :to="{ name: 'wallet' }">Wallet</router-link>
      <router-link :to="{ name: 'block' }">Block</router-link>
      <router-link :to="{ name: 'chain' }">Chain</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
"use strict";

export default {
  name: "App"
};
</script>


<style lang="scss">
#nav {
  background-color: $primary;
  display: flex;
  a {
    padding: 1rem;
    color: $white;
    min-width: 5rem;
    &:hover {
      background-color: $primary-dark;
      color: $primary-dark-invert;
    }
    &.router-link-exact-active {
      border-bottom: 5px solid $black;
    }
  }
}
</style>
