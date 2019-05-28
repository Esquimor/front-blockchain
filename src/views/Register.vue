<template>
  <div class="register columns is-centered">
    <div class="column is-7">
      <h1 class="title is-2">Register</h1>
      <div class="columns register-elements">
        <form @submit.prevent="signByEmail" class="register-email column is-6">
          <b-field label="Email">
            <b-input type="email" v-model="email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password"></b-input>
          </b-field>
          <b-field label="Confirmation">
            <b-input type="password" v-model="confirmation"></b-input>
          </b-field>
          <button type="submit" class="button is-primary">Sign in</button>
        </form>
        <div class="register-other column is-6">
          <ButtonSI @click.native="signByGoogle" color="dd4b39" label="Google" icon="google-plus"/>
          <ButtonSI @click.native="signByFacebook" color="3b5998" label="Facebook" icon="facebook"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";

import ButtonSI from "@/components/button/ButtonSI";

export default {
  name: "Register",
  components: {
    ButtonSI
  },
  data() {
    return {
      email: "",
      password: "",
      confirmation: ""
    };
  },
  methods: {
    signByEmail() {},
    signByGoogle() {},
    signByFacebook() {}
  }
};
</script>

<style lang="scss">
.register {
  &-email {
    margin: 1rem;
  }
  &-other {
    > div {
      margin: 1rem;
    }
  }
}
</style>
