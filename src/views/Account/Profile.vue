<template>
  <div class="profile">
    <section class="profile-account">
      <h2 class="title is-2">Account</h2>
      <div class="profile-account-field">
        <span class="profile-account-field-element">Email</span>
        <span class="profile-account-field-label">{{ user.email }}</span>
        <span class="profile-account-field-element">Amount</span>
        <span class="profile-account-field-label">{{ wallet.amount }}</span>
      </div>
    </section>
    <section class="profile-wallet">
      <h2 class="title is-2">Wallet</h2>
      <router-link :to="{ name: 'wallet' }">All your Wallet</router-link>
      <div class="profile-wallet-input">
        <h3 class="title is-4">Your last Input</h3>
        {{ walletInputSortByDate[0] }}
      </div>
      <div class="profile-wallet-output">
        <h3 class="title is-4">Your last Output</h3>
        {{ walletOutputSortByDate[0] }}
      </div>
    </section>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters([
      "user",
      "wallet",
      "walletInputByUser",
      "walletOutputByUser"
    ]),
    walletInputSortByDate() {
      return this.walletInputByUser(this.user.id).sort((a, b) => {
        return b.date - a.date;
      });
    },
    walletOutputSortByDate() {
      return this.walletOutputByUser(this.user.id).sort((a, b) => {
        return b.date - a.date;
      });
    }
  }
};
</script>

<style lang="scss">
</style>
