import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Account/Profile.vue";
import Transfert from "@/views/Account/Transfert.vue";
import Wallet from "@/views/Account/Wallet.vue";
import Block from "@/views/Blockchain/Block.vue";
import Chain from "@/views/Blockchain/Chain.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/account/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/account/transfert",
      name: "transfert",
      component: Transfert
    },
    {
      path: "/account/wallet",
      name: "wallet",
      component: Wallet
    },
    {
      path: "/blockchain/chain",
      name: "chain",
      component: Chain
    },
    {
      path: "/blockchain/block",
      name: "block",
      component: Block
    }
  ]
});
