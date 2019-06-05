<template>
  <Default>
    <div class="Buy">
      <h2 class="title is-2">Acheter</h2>
      <span
        class="Transferts-msg has-text-danger"
        v-if="error"
      >Une erreur est survenue. Merci de réessayer</span>
      <span class="Transgerts-msg has-text-success" v-if="success">Opération réussie</span>
      <b-field label="Somme à acheter:">
        <b-numberinput min="0" v-model="amount" @input="deleteMsg"></b-numberinput>
      </b-field>
      <BButton type="is-primary" @click.native="buy" :loading="loading">Acheter</BButton>
    </div>
  </Default>
</template>

<script>
"use strict";

import Default from "@/templates/Default";

export default {
  name: "Buy",
  components: {
    Default
  },
  data() {
    return {
      amount: 0,
      error: false,
      success: false,
      loading: false
    };
  },
  methods: {
    buy() {
      this.loading = true;
      this.$store
        .dispatch("buy", this.amount)
        .then(() => {
          this.amount = 0;
          this.success = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    deleteMsg() {
      if (this.success) this.success = false;
      if (this.error) this.error = false;
    }
  }
};
</script>

<style lang="scss">
.Buy {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
}
</style>
