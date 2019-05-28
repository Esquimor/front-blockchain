<template>
  <div class="login columns is-centered">
    <div class="column is-7">
      <h1 class="title is-2">Login</h1>
      <div class="columns login-elements">
        <form @submit.prevent="connectByEmail" class="login-email column is-6">
          <span v-if="errorMsg !== ''">{{ errorMsg }}</span>
          <b-field label="Email">
            <b-input type="email" v-model="email" @change="removeError"/>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password" @change="removeError"/>
          </b-field>
          <button type="submit" class="button is-primary">Login</button>
        </form>
        <div class="login-other column is-6">
          <ButtonSI id="my-signin2" color="dd4b39" label="Google" icon="google-plus"/>
          <ButtonSI
            @click.native="connectByFacebook"
            color="3b5998"
            label="Facebook"
            icon="facebook"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";
import ButtonSI from "@/components/button/ButtonSI";

export default {
  name: "Login",
  components: {
    ButtonSI
  },
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },
  methods: {
    connectByEmail() {
      this.$store
        .dispatch("loginEmail", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.password = "";
          this.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    },
    removeError() {
      if (this.errorMsg !== "") this.errorMsg = "";
    },
    connectByGoogle(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      this.$store.dispatch("loginGoogle", {
        clientId: id_token
      });
    },
    connectByFacebook() {
      let that = this;
      FB.login(function(response) {
        if (response.authResponse) {
          console.log(response.authResponse);
          that.$store.dispatch("loginFacebook", {
            clientId: response.authResponse.accessToken
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      });
    }
  },
  mounted() {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      onsuccess: googleUser => {
        this.connectByGoogle(googleUser);
      },
      onfailure: e => {
        console.log(e);
      }
    });
  }
};
</script>

<style lang="scss">
.login {
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
