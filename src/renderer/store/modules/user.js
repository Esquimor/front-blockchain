import api from "../../services/api";
import * as types from "./../types";

export default {
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  actions: {
    editPassword({ state }, { password, confirmation }) {
      return api
        .post("user/edit/password", {
          id: state.user.id,
          password,
          confirmation
        })
        .then(() => {
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    login({ commit }, { email, password }) {
      return api
        .post("user/login/email", {
          email,
          password
        })
        .then(({ data }) => {
          commit(types.SET_USER, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    logout({ commit }) {
      commit(types.LOGOUT);
    },
    register({ commit }, { email, password, confirmation }) {
      return api
        .post("user/register/email", {
          email,
          password,
          confirmation
        })
        .then(({ data }) => {
          commit(types.SET_USER, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    editUser({ commit, state }, { pseudonyme, email }) {
      return api
        .post("user/edit/account", {
          id: state.user.id,
          pseudonyme,
          email
        })
        .then(() => {
          commit(types.EDIT_USER, {
            email,
            pseudonyme
          });
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    transfert({ commit, state }, { amount, receiver }) {
      return api
        .post("transaction/create", {
          id: state.user.id,
          amount,
          receiver
        })
        .then(() => {
          commit(types.TRANSACTION, amount);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    buy({ commit, state }, amount) {
      return api
        .post("transaction/buy", {
          id: state.user.id,
          amount
        })
        .then(() => {
          commit(types.BUY, amount);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    }
  },
  mutations: {
    [types.SET_USER](state, user) {
      state.user = user;
    },
    [types.LOGOUT](state) {
      state.user = null;
    },
    [types.EDIT_USER](state, { email, pseudonyme }) {
      state.user = Object.assign({}, state.user, {
        email: email,
        pseudonyme: pseudonyme
      });
    },
    [types.TRANSACTION](state, amount) {
      state.user = Object.assign({}, state.user, {
        amount: state.user.amount - amount
      });
    },
    [types.BUY](state, amount) {
      state.user = Object.assign({}, state.user, {
        amount: state.user.amount + amount
      });
    }
  }
};
