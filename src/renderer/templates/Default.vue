<template>
  <div class="DefaultTemplate">
    <nav class="DefaultTemplate-nav">
      <router-link :to="{name: 'profile'}">Profile</router-link>
      <router-link :to="{name: 'transferts'}">Transferts</router-link>
      <router-link :to="{name: 'buy'}">Acheter des Jetons</router-link>
      <div class="DefaultTemplate-nav-logout" @click="logout">Se deconnecter</div>
    </nav>
    <div class="DefaultTemplate-main">
      <slot/>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "DefaultTemplate",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "loginRegister" });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/buefy.scss";

.DefaultTemplate {
  display: flex;
  height: 100vh;
  width: 100vw;
  &-nav {
    width: 20%;
    background-color: black;
    display: flex;
    flex-direction: column;
    > a {
      color: white;
      padding: 1rem;

      &:hover {
        background-color: $primary;
        color: white;
      }
    }
    &-logout {
      color: white;
      padding: 1rem;
      cursor: pointer;
      &:hover {
        background-color: $primary;
        color: white;
      }
    }
  }
  &-main {
    width: 80%;
  }
}
</style>
