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
      FB.login(
        function(response) {
          if (response.authResponse) {
            that.$store.dispatch("loginFacebook", {
              userId: response.authResponse.userID
            });
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email" }
      );
    }
  },
  mounted() {
    let googleUser = {};
    let auth2 = null;
    let that = this;
    let startApp = function() {
      gapi.load("auth2", function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
          client_id:
            "449962804508-uqtd5pi2je3rot74e907cq739bga4sce.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          // Request scopes in addition to 'profile' and 'email'
          scope: "profile email"
        });
        attachSignin(document.getElementById("my-signin2"), auth2);
      });
    };

    function attachSignin(element, auth2) {
      auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          that.connectByGoogle(googleUser);
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    }
    startApp();
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

#my-signin2 {
  background-color: #dd4b39;
}
</style>
