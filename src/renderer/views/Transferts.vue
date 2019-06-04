<template>
  <Default>
    <div class="Transferts">
      <h2 class="title is-2">Transferts</h2>
      <b-field label="Device:" class="Transferts-device">
        <b-radio v-model="device" native-value="eur" @input="deleteMsg">Euro</b-radio>
        <b-radio v-model="device" native-value="liv" @input="deleteMsg">Livre</b-radio>
      </b-field>
      <span class="Transferts-amount">Vous disposez de {{ somme }} {{ deviceType }}</span>
      <span
        class="Transferts-msg has-text-danger"
        v-if="errorMsg"
      >Une erreur est survenue. Merci de réessayer</span>
      <span class="Transgerts-msg has-text-success" v-if="success">Opération réussite</span>
      <b-field label="Somme à transférer:">
        <b-numberinput min="0" :max="somme" v-model="amount" @input="deleteMsg"></b-numberinput>
      </b-field>
      <b-field label="Adresse du receveur">
        <b-input v-model="receiver" @input="deleteMsg"/>
      </b-field>
      <BButton type="is-primary" @click.native="transfert">Transférer</BButton>
    </div>
  </Default>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import Default from "@/templates/Default";

export default {
  name: "Transferts",
  components: {
    Default
  },
  data() {
    return {
      device: "eur",
      amount: 0,
      receiver: "",
      success: false,
      errorMsg: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    somme() {
      return this.device === "eur" ? this.user.amount : this.user.amount * 0.8;
    },
    deviceType() {
      return this.device === "eur" ? "€" : "£";
    }
  },
  methods: {
    transfert() {
      const amount =
        this.device === "eur" ? this.amount : (100 * this.amount) / 80;
      this.$store
        .dispatch("transfert", {
          amount,
          receiver: this.receiver
        })
        .then(() => {
          this.success = true;
          this.amount = 0;
        })
        .catch(() => {
          this.errorMsg = true;
        });
    },
    deleteMsg() {
      if (this.success) this.success = false;
      if (this.errorMsg) this.errorMsg = false;
    }
  },
  watch: {
    device() {
      this.$nextTick(() => {
        if (this.somme < this.amount) {
          this.amount = this.somme;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Transferts {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
  &-device {
    > .label {
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  &-amount {
    margin-bottom: 20px;
  }
  &-msg {
    margin-bottom: 10px;
  }
}
</style>
