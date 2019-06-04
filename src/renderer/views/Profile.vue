<template>
  <Default>
    <div class="Profile">
      <section class="Profile-account">
        <h2 class="title is-2">Compte</h2>
        <div class="Profile-account-field">
          <span class="Profile-elements">Pseudonyme:</span>
          <span class="Profile-labels">{{ user.pseudonyme }}</span>
          <span class="Profile-elements">Email:</span>
          <span class="Profile-labels">{{ user.email }}</span>
          <span class="Profile-elements">Clef public:</span>
          <span class="Profile-labels">{{ user.public_key }}</span>
          <span class="Profile-elements">Crédit:</span>
          <span class="Profile-labels">{{ user.amount }}</span>
          <BButton
            class="Profile-account-field-button"
            type="is-primary"
            @click.native="openEdit = true"
          >Editer votre compte</BButton>
          <BModal :active="openEdit" has-modal-card :can-cancel="false">
            <EditModalAccount @close="openEdit= false" :user="user"/>
          </BModal>
        </div>
      </section>
    </div>
  </Default>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import Default from "@/templates/Default";
import EditModalAccount from "@/components/EditModalAccount";

export default {
  name: "Profile",
  components: {
    Default,
    EditModalAccount
  },
  data() {
    return {
      openEdit: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss">
.Profile {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
  &-elements {
    margin-right: 20px;
    margin-top: 10px;
    font-weight: 800;
  }
  &-labels {
    word-break: break-all;
  }
  &-account {
    &-field {
      display: flex;
      flex-direction: column;
      &-button {
        margin-top: 20px;
      }
    }
  }
}
</style>
