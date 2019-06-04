import Vue from "vue";
import Router from "vue-router";
import Buy from "@/views/Buy";
import LoginRegister from "@/views/LoginRegister";
import Profile from "@/views/Profile";
import Transferts from "@/views/Transferts";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "loginRegister",
      component: LoginRegister
    },
    {
      path: "/buy",
      name: "buy",
      component: Buy
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/transferts",
      name: "transferts",
      component: Transferts
    }
  ]
});
