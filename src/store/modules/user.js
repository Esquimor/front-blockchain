import * as types from "./../types";
import api from "@services/api";

export default {
  state: {
    user: {}
  },
  getters: {
    user: state => state.user
  },
  actions: {
    loginEmail({ commit }, { email, password }) {
      return api
        .post("user/login/email", {
          email,
          password
        })
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    loginGoogle({ commit }, params) {
      return api
        .post("user/login/google", params)
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    loginFacebook({ commit }, { clientId }) {
      return api
        .post("user/login/facebook", {
          clientId
        })
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(() => {
          return Promise.reject();
        });
    }
  },
  mutations: {
    [types.LOGIN](state, user) {
      state.user = user;
    }
  }
};
