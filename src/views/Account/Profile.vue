<template>
  <div class="Profile">
    <section class="Profile-account">
      <h2 class="title is-2">Compte</h2>
      <div class="Profile-account-field">
        <span class="Profile-elements">Pseudonyme:</span>
        <span class="Profile-labels">{{ user.pseudonyme }}</span>
        <span class="Profile-elements">Email:</span>
        <span class="Profile-labels">{{ user.email }}</span>
        <span class="Profile-elements">Crédit:</span>
        <span class="Profile-labels">{{ user.amount }}</span>
      </div>
    </section>
    <section class="Profile-rs">
      <ButtonSI class="Profile-rs-button" color="dd4b39" label="Google" icon="google-plus"/>
      <ButtonSI class="Profile-rs-button" color="3b5998" label="Facebook" icon="facebook"/>
    </section>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import ButtonSI from "@/components/button/ButtonSI";

export default {
  name: "Profile",
  components: {
    ButtonSI
  },
  computed: {
    ...mapGetters(["user", "wallet"])
  }
};
</script>

<style lang="scss">
.Profile {
  margin: 20px 20% 0px 20%;
  width: 60%;
  &-elements {
    margin-right: 20px;
    margin-top: 10px;
    font-weight: 800;
  }
  &-account {
    &-field {
      display: flex;
      flex-direction: column;
    }
  }
  &-rs {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    &-button {
      width: 400px;
    }
  }
}
</style>
