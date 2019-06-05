<template>
  <div id="app">
    <router-view></router-view>
    <div class="App-address" v-if="giveAddress">
      <div class="App-address-background"/>
      <div class="App-address-modal">
        <h2 class="title is-5">Adresse du noeud</h2>
        <span v-if="errorMsg !== ''" class="has-text-danger">{{ errorMsg }}</span>
        <BInput ref="websocketInput" type="text" @input="removeError"/>
        <div class="App-address-modal-button">
          <button @click="giveAddress = false" class="button is-danger outline">Annuler</button>
          <button @click="changeSocket" class="button is-primary">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
};

export default {
  name: "app-blockchain",
  data() {
    return {
      wsAddress: "http://localhost:8001",
      giveAddress: false,
      errorMsg: ""
    };
  },
  computed: {
    ...mapGetters(["user", "chain"]),
    hasUser() {
      return !!this.user;
    }
  },
  watch: {
    wsAddress: {
      immediate: true,
      handler(ws) {
        this.$store.dispatch("removeChain");
        if (ws !== "") {
          axios
            .post(`${ws}/addPeer`, {
              peer: `ws://${window.location.hostname}:${window.location.port}`
            })
            .then(({ data }) => {
              this.giveAddress = false;
              const ws = new WebSocket(`ws://localhost:${data.p2p}`);
              ws.onerror = () => {
                this.giveAddress = true;
                this.wsAddress = "";
                this.errorMsg = "L'adresse spécifié n'est plus joignable.";
              };
              ws.onmessage = e => {
                const data = JSON.parse(e.data);
                let element;
                switch (data.type) {
                  case MessageType.QUERY_ALL:
                    element = JSON.parse(data.data);
                    this.$store.dispatch("setChain", element);
                    break;
                  case MessageType.RESPONSE_BLOCKCHAIN:
                  case MessageType.QUERY_LATEST:
                    element = JSON.parse(data.data);
                    if (this.chain.length === 0) {
                      this.$store.dispatch("setChain", element);
                    } else {
                      this.$store.dispatch("addBlock", element);
                    }
                    break;
                }
              };
            })
            .catch(() => {
              this.giveAddress = true;
              this.wsAddress = "";
              this.errorMsg = "L'adresse spécifié n'est pas joignable.";
            });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.App {
  &-address {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 100;
    &-modal {
      background-color: white;
      z-index: 150;
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid gray;
      padding: 2rem;
      &-button {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        > button {
          margin-left: 20px;
        }
      }
    }
    &-background {
      position: fixed;
      top: 0px;
      left: 0px;
      opacity: 0.2;
      background-color: #eeeeee;
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }
}
</style>
