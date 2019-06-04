<template>
  <div class="LoginRegister">
    <div class="LoginRegister-login">
      <h2 class="title is-2">Login</h2>
      <span class="has-text-danger" v-if="login.errorMsg">{{ login.errorMsg }}</span>
      <b-field label="Email">
        <BInput v-model="login.email" @input="removeErrorLogin" type="email"/>
      </b-field>
      <b-field label="Mot de passe">
        <BInput v-model="login.password" @input="removeErrorLogin" type="password"/>
      </b-field>
      <BButton class="is-primary" @click.native="loginUser">Se loger</BButton>
    </div>
    <div class="LoginRegister-register">
      <h2 class="title is-2">S'enregistrer</h2>
      <span class="has-text-danger" v-if="register.errorMsg">{{ register.errorMsg }}</span>
      <b-field label="Email">
        <BInput v-model="register.email" @input="removeErrorRegister" type="email"/>
      </b-field>
      <b-field label="Mot de passe">
        <BInput v-model="register.password" @input="removeErrorRegister" type="password"/>
      </b-field>
      <b-field label="Confirmation">
        <BInput v-model="register.confirmation" @input="removeErrorRegister" type="password"/>
      </b-field>
      <BButton class="is-primary" @click.native="registerUser">S'enregistrer</BButton>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "LoginRegister",
  data() {
    return {
      login: {
        email: "",
        password: "",
        errorMsg: ""
      },
      register: {
        email: "",
        password: "",
        confirmation: "",
        errorMsg: ""
      }
    };
  },
  methods: {
    loginUser() {
      this.$store
        .dispatch("login", this.login)
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.login.password = "";
          this.login.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    },
    removeErrorLogin() {
      if (this.login.errorMsg !== "") this.login.errorMsg = "";
    },
    registerUser() {
      this.$store
        .dispatch("register", this.register)
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.register.password = "";
          this.register.confirmation = "";
          this.register.errorMsg =
            "Une erreur est survenue, merci de réessayer";
        });
    },
    removeErrorRegister() {
      if (this.register.errorMsg !== "") this.register.errorMsg = "";
    }
  }
};
</script>

<style lang="scss">
.LoginRegister {
  display: flex;
  padding: 10%;
  > div {
    width: 50%;
    padding: 1rem;
  }
}
</style>
