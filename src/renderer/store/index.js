import Vue from "vue";
import Vuex from "vuex";

import { createPersistedState } from "vuex-electron";

import user from "./modules/user";
import blockchain from "./modules/blockchain";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    blockchain
  },
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== "production"
});
